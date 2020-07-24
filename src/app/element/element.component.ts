import { Component,EventEmitter,Input,Output, OnInit } from '@angular/core';
import { Node } from 'src/app/Node/Node'

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  

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
  

  ElementClick() {
    if(this.elementType == "START") {
      this.node.setStartPoint() ;
      this.pageAction.emit(this.createPageActionPayload("CLEAR_BOX_ACTION", null));
      this.pageAction.emit(this.createPageActionPayload("SET_START_NODE", this.node));
    }
    if(this.elementType == "DESTINATION") {
      this.node.setEndPoint() ;
      this.pageAction.emit(this.createPageActionPayload("CLEAR_BOX_ACTION", null));
      this.pageAction.emit(this.createPageActionPayload("SET_DEST_NODE", this.node));
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
