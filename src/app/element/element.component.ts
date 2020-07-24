import { Component,EventEmitter,Input,Output, OnInit } from '@angular/core';
import { Node } from 'src/app/Node/Node'

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  //represents one square box in the grid
  //creates the visual representation of a node with multiple properties

  @Input("node")
  node: Node ;
  @Input("elementType")
  elementType : string = null  ;
  @Input("visited")
  visited ;
  
  @Output("pageAction")
  pageAction:EventEmitter<{action: string, data: any}> = new EventEmitter();
  
  constructor() { }
  
  ngOnInit() { }

  createPageActionPayload(action: string, data: any){
    return {
      "action": action,
      "data": data
    }
  }
  
  // Emits an event that is caught by the pageAction function in the app.component file and is used to send value of assigned node there

  ElementClick() {
    if(this.elementType == "START") {
      if(this.node.StartPoint){
        this.node.StartPoint = false ;
        this.pageAction.emit(this.createPageActionPayload("CLEAR_BOX_ACTION", null));  
      }
      else{
        this.node.setStartPoint() ;
        this.pageAction.emit(this.createPageActionPayload("CLEAR_BOX_ACTION", null));
        this.pageAction.emit(this.createPageActionPayload("SET_START_NODE", this.node));
    }
  }
    if(this.elementType == "DESTINATION") {
      if(this.node.EndPoint) {
        this.node.EndPoint = false ;
        this.pageAction.emit(this.createPageActionPayload("CLEAR_BOX_ACTION", null));  
      }
      else {
        this.node.setEndPoint() ;
        this.pageAction.emit(this.createPageActionPayload("CLEAR_BOX_ACTION", null));
        this.pageAction.emit(this.createPageActionPayload("SET_DEST_NODE", this.node));
      }
    }
    if(this.elementType == "BLOCKER"){
      this.node.block();
    }
    if(this.elementType == "HIGH ELEVATION") {
      this.node.highElevation() ;
    }
    if(this.elementType == "GOOD ELEVATION") {
      this.node.goodElevation() ;
    }
  }

  

}
