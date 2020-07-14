import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shortestpath';

  options:FormGroup ;
  //elevationControl = new FormControl('primary') ;

  constructor(private fb: FormBuilder) {
    //this.options = fb.group({color : this.elevationControl}) ;
    this.options = this.fb.group({
      "Rows" :[null,Validators.compose([Validators.required, Validators.min(5),Validators.max(15)])],
      "Columns" :[null,Validators.compose([Validators.required, Validators.min(5),Validators.max(15)])],
      "startPoint": [null,Validators.required],
      "endPoint":[null,Validators.required]
      
    });
  }



  ngOnInit()  {
    this.createGrid() ;

  }

  createGrid() {
    
  }
}

  


export class Node {
  row: number ;
  column: number ;

  distance: number | null;
  distanceFrom: Node ;

  StartPoint: boolean ;
  EndPoint: boolean ;
  isVisited: boolean ;
  isBlocked: boolean ;
  isInShortestPath: boolean ;
  isInProgress : boolean ;

  
  constructor() {
    this.row = 0 ;
    this.column = 0 ;
    this.distance = null ;
    this.distanceFrom = null ;
    this.StartPoint = null ;
    this.EndPoint = null ;
    this.isVisited = null ;
    this.isBlocked = null ;
    this.isInShortestPath = null ;
    this.isInProgress = null ;
  }

  setStartPoint() {
    this.StartPoint = true ;
  }

  setEndPoint() {
    this.EndPoint = true ;
  }

  block() {
    this.isBlocked = true ;
  }

  visit() {
    this.isVisited = true ;
  }

  setPosition(x:number,y:number){
    this.row = y ;
    this.column = x ;
  }

  calculateDistance(currentNode:Node) {
    let dist = currentNode.distance?currentNode.distance+1:1 ;
    if(!this.isBlocked && !this.isVisited && (this.distance == null || this.distance > dist)){
      this.distance = dist ;
      this.distanceFrom = currentNode ;
    }
    return this ;
  }
}
