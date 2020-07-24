import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Node } from 'src/app/Node/Node'
import { _ParseAST } from '@angular/compiler';
import * as _ from 'underscore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';




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

  // Asking the user to input the no. of rows and columns to create a grid

  constructor(private fb: FormBuilder) {
    //this.options = fb.group({color : this.elevationControl}) ;
    this.options = this.fb.group({
      "Rows" :[null,[Validators.required, Validators.min(5)]],
      "Columns" :[null,[Validators.required, Validators.min(5)]],
      
      
    });
    this.options.valueChanges.subscribe(optionsForm => {
      this.ROWS = optionsForm.Rows ;
      this.COLUMNS = optionsForm.Columns ;
      this.createGrid() ;
    }) ;
  }

  // Creates a default 10x10 grid on initialisation

  ngOnInit()  {
    this.createGrid() ;
  }

  // Function to create the grid

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

  // Function to dictate the type of node it is

  selectElement(elementType) {
    if(elementType === 'START') {
      this.elementType = elementType ;
    }
    else if(elementType == 'DESTINATION') {
      this.elementType = elementType ;
    }
    else if(elementType == 'HIGH ELEVATION') {
      this.elementType = elementType ;
    }
    else if(elementType == 'GOOD ELEVATION') {
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
  
  // when you interact with an element, it forms an event to be communicated from the element component to app component
  // this event transfer a string telling us what to do with that data, and the properties of that element
  
  pageAction(event){
    let {action, data} = event;
    if(action == "SET_START_NODE"){
      this.startPoint = null ;
      //this.options.get("startPoint").setValue(data);
      //console.log(this.options.controls['startPoint'].patchValue(data)) ;
      this.startPoint = data ;
  
    }else if(action == "SET_DEST_NODE"){
      this.endPoint = data ;
    }else if(action == "CLEAR_BOX_ACTION"){
      this.clearBoxAction();
    }
  }

  // function to reset the grid and the nodes

  reset() {
    this.gridArr = null ;
    this.startPoint = null ;
    this.endPoint = null ;
    this.elementType = null ;
    this.evalNodeList = [] ;
    this.options.reset({
      Rows: this.ROWS ,
      Columns: this.COLUMNS 
    })
    this.createGrid() ;
  }

  // function to find the shortest path
  // compares distance from neighbouring nodes to find the shortest path

  async findShortestPath(){
    
    let startNode = this.startPoint ;
    let destNode = this.endPoint ;
    let destNeighbours = this.findNeighbours(destNode);

    this.evalNodeList.push(startNode);
    
    for(let node of this.evalNodeList){
      
      if(!node.isVisited){
        this.updateNeighborsDistance(node);
      }
      

      if(this.checkIfDestReached(destNeighbours)){
      break;
      }
    }

    let currNode =destNode
    for(let idx=0; idx<destNode.distance-1; idx++){
      let prevNodeInShortestPath = currNode.distanceFrom;
      this.gridArr[prevNodeInShortestPath.y][prevNodeInShortestPath.x].isInShortestPath = true;
      currNode = prevNodeInShortestPath;
    }
  }

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
  
  // updating distance of each and every neighbor
  
  updateNeighborsDistance = (node:Node) => {
    let neighbours = this.findNeighbours(node);

    if(neighbours){
      for (let pos of neighbours){

        let n = this.gridArr[pos.y][pos.x]; 
        this.gridArr[pos.y][pos.x] = n.updateDistance(node);

        if(!n.EndPoint && !n.StartPoint && !n.isBlocked && !n.isVisited){
  
          this.evalNodeList.push(n);
        }
      }
    }
  
    node.visit();
  }

  // function for various boundary conditions at the edges when finding and evaluating the relevant neighbours

  findNeighbours({x, y}){
    
    let validNeighors = [];

  
    if(x == 0){
      validNeighors.push({"x": x+1,y});
    }
  
    else if (x == this.COLUMNS-1){
      validNeighors.push({"x": x-1,y});
    }
  
    else{
      validNeighors.push({"x": x+1,y});
      validNeighors.push({"x":x-1,y});
    }

    
    if(y == 0){
      validNeighors.push({x,"y":y+1});
    }
    
    else if (y == this.ROWS-1){
      validNeighors.push({x,"y":y-1});
    }
    else{
      validNeighors.push({x,"y":y+1});
      validNeighors.push({x,"y":y-1});
    }

    return validNeighors;
  }

}