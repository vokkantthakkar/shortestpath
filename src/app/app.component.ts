import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Node } from 'src/app/Node/Node'
import { _ParseAST } from '@angular/compiler';
import * as _ from 'underscore';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shortestpath';

  options:FormGroup = null ;
  //elevationControl = new FormControl('primary') ;

  ROWS = 10 ;
  COLUMNS = 10 ;

  gridRows: Array<number> = null ;
  gridCols: Array<number> = null ;
  gridArr : Array<Array<Node>> = null ;
  elementType:string = null ;
  evalNodeList = [] ;
  startPoint: Node ;
  endPoint: Node ;

  constructor(private fb: FormBuilder) {
    //this.options = fb.group({color : this.elevationControl}) ;
    this.options = this.fb.group({
      "Rows" :[null,[Validators.required, Validators.min(5)]],
      "Columns" :[null,[Validators.required, Validators.min(5)]],
      //"startPoint": [null,Validators.required],
      //"endPoint":[null,Validators.required]
      
    });
    this.options.valueChanges.subscribe(optionsForm => {
      this.ROWS = optionsForm.Rows ;
      this.COLUMNS = optionsForm.Columns ;
      this.createGrid() ;
    }) ;
  }



  ngOnInit()  {
    this.createGrid() ;

  }

  createGrid() {

    this.gridRows = _.range(this.ROWS) ;
    this.gridCols = _.range(this.COLUMNS) ;
    
    this.gridArr = _.chain(this.gridRows) 
                    .map(y => {
                      return _.chain(this.gridCols)
                              .map(x => {
                                let n = new Node() ;
                                n.setPosition(y,x) ;
                                return n ;
                              })
                              .value() ;
                    })
                    .value() ;
  }

  selectElement(elementType) {
    if(elementType === 'START') {
      this.elementType = elementType ;
 
    }
    else if(elementType == 'DESTINATION') {
      this.elementType = elementType ;
    }
    else if (elementType ==='BLOCKER') {
      if(this.elementType ==='BLOCKER'){
        this.clearBoxAction();
      }else{
        this.elementType = elementType;
      }
    }
  }
  clearBoxAction(){
    this.elementType = null;
  }
  

  resetGridProperty(propertName, value){
    for(let row of this.gridArr){
      for (let node of row){
        node[propertName]=value;
      }
    }
  }
  pageAction(event){
    let {action, data} = event;
    if(action == "SET_START_NODE"){
      
      //this.options.get("startPoint").setValue(data);
      //console.log(this.options.controls['startPoint'].patchValue(data)) ;
      this.startPoint = data ;
      console.log(this.startPoint) ;
  
    }else if(action == "SET_DEST_NODE"){
      this.endPoint = data ;
    }else if(action == "CLEAR_BOX_ACTION"){
      this.clearBoxAction();
    }
  }

  async findShortestPath(){
    

    let startNode = this.startPoint ;
    let destNode = this.endPoint ;
    let destNeighbours = this.findNeighbours(destNode);

    // including start node as first evaluating node
    this.evalNodeList.push(startNode);
    
    // loop through nodes in evaluation node list
    for(let node of this.evalNodeList){
      //for visualization - turn on node to green
      this.toggleNodeInProcess(node);

      //if the node is not visited then check neighbours
      if(!node.isVisited){
        this.updateNeighborsDistance(node);
      }
      //for visualization - include delay for visualize green flow
      
      //for visualization - turn off node from green
      this.toggleNodeInProcess(node);

      // loop should break if all the neighbours of destination node is visited
      if(this.checkIfDestReached(destNeighbours)){
        break;
      }
    }

    // Plotting the shortest distance path.
    // this is backtracking from destination node all the way to start node via distance and distanceFrom node
    // distanceFrom attribute store the previous visted node in shortest path
    let currNode =destNode
    for(let idx=0; idx<destNode.distance-1; idx++){
      let prevNodeInShortestPath = currNode.distanceFrom;
      this.gridArr[prevNodeInShortestPath.y][prevNodeInShortestPath.x].isInShortestPath = true;
      currNode = prevNodeInShortestPath;
    }
  }

  // For visualization. To toggle between if the node being passed is currently being evaluated.
  // Green color is given to box if the isInProgress is set to true.
  toggleNodeInProcess(node:Node){
    node.isInProgress = !node.isInProgress;
  }

  // Check if all the destination node neighbours are visited / blocked.
  // if they all are visited then algorithm is complete
  checkIfDestReached(neighbours){
    let isAllNeighbourVisited = true;

    for(let pos of neighbours){
      let node = this.gridArr[pos.y][pos.x];
      isAllNeighbourVisited = isAllNeighbourVisited && (node.isVisited || node.isBlocked);
    }

    if(isAllNeighbourVisited){
      return true;
    }else{
      return false;
    }
  }
  
  // Evaluating the neighbours distance of visiting node being passed.
  // The neighbours will then be added to evaulation list for being evaulated down in flow.
  updateNeighborsDistance = (node:Node) => {
    let neighbours = this.findNeighbours(node);

    if(neighbours){
      for (let pos of neighbours){

        let n = this.gridArr[pos.y][pos.x]; 
        this.gridArr[pos.y][pos.x] = n.updateDistance(node);

        if(!n.EndPoint && !n.StartPoint && !n.isBlocked && !n.isVisited){
          // adding to evaluation list
          this.evalNodeList.push(n);
        }
      }
    }
    // Mark the visiting node as Visited once the neighbour's distance are calculated 
    // and added to evaluation list
    node.visit();
  }

  //Find neighbours based on grid boundary restrictions
  findNeighbours({x, y}){
    
    let validNeighors = [];

    //if left is restricted
    if(x == 0){
      validNeighors.push({"x": x+1,y});
    }
    //if right is restricted
    else if (x == this.COLUMNS-1){
      validNeighors.push({"x": x-1,y});
    }
    //if no x direction restriction
    else{
      validNeighors.push({"x": x+1,y});
      validNeighors.push({"x":x-1,y});
    }

    //if up is restricted
    if(y == 0){
      validNeighors.push({x,"y":y+1});
    }
    //if down is restricted
    else if (y == this.ROWS-1){
      validNeighors.push({x,"y":y-1});
    }
    //if no y direction restriction
    else{
      validNeighors.push({x,"y":y+1});
      validNeighors.push({x,"y":y-1});
    }

    return validNeighors;
  }

}