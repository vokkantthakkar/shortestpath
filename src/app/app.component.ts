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

  constructor(private fb: FormBuilder) {
    //this.options = fb.group({color : this.elevationControl}) ;
    this.options = this.fb.group({
      "Rows" :[null,[Validators.required, Validators.min(5)]],
      "Columns" :[null,[Validators.required, Validators.min(5)]],
      "startPoint": [null,Validators.required],
      "endPoint":[null,Validators.required]
      
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
      this.resetGridProperty('StartPoint',false) ;
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
      this.options.get("startPoint").setValue(data);
    }else if(action == "SET_DEST_NODE"){
      this.options.get("endPoint").setValue(data);
    }else if(action == "CLEAR_BOX_ACTION"){
      this.clearBoxAction();
    }
  }
/*
  shortestPath() {
    let startNode = this.options.get("startPoint").value ;
    let destNode = this.options.get("endPoint").value ;
    let destNeighbours = this.findNeighbours(destNode) ;
    console.log(startNode) ;

    this.evalNodeList.push(startNode) ;

    for(let node of this.evalNodeList) {
      if(!node.isVisited) {
        this.updateNeighborsDistance(node) ;
      }
      if(this.checkIfDest(destNeighbours)){
        break ;
      }
    }

    let currNode = destNode ;
    for(let idx = 0; idx<destNode.distance-1; idx++) {
      let prevNodeInShortestPath = currNode.distanceFrom ;
      this.gridArr[prevNodeInShortestPath.y][prevNodeInShortestPath.x].isInShortestPath = true ;
      currNode = prevNodeInShortestPath ;
    }
  }

  checkIfDest(neighbours) {

    let isAllNeighbourVisited = true ;
    for(let pos of neighbours) {
      let node = this.gridArr[pos.y][pos.x] ;
      isAllNeighbourVisited = isAllNeighbourVisited && (node.isVisited || node.isBlocked) ;
    }
    if(isAllNeighbourVisited){
      return true ;
    }else {
      return false ;
    }
  }
  
  updateNeighborsDistance = (node:Node) => {
    let neighbours = this.findNeighbours(node) ;
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
  
  findNeighbours({row, column}){
    
    let validNeighors = [];

    //if left is restricted
    if(column == 0){
      validNeighors.push({"x": column+1,row});
    }
    //if right is restricted
    else if (column == this.COLUMNS-1){
      validNeighors.push({"x": column-1,row});
    }
    //if no x direction restriction
    else{
      validNeighors.push({"x": column+1,row});
      validNeighors.push({"x":column-1,row});
    }

    //if up is restricted
    if(row == 0){
      validNeighors.push({column,"y":row+1});
    }
    //if down is restricted
    else if (row == this.ROWS-1){
      validNeighors.push({column,"y":row-1});
    }
    //if no y direction restriction
    else{
      validNeighors.push({column,"y":row+1});
      validNeighors.push({column,"y":row-1});
    }

    return validNeighors;
  }
*/
}
