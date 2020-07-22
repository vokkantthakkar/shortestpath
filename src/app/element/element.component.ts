import { Component,EventEmitter,Input,Output, OnInit } from '@angular/core';
import { Node } from 'src/app/Node/Node'

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  constructor() { }

  @Input("node")
  node: Node ;
  @Input("elementType")
  elementType:string  ;
  @Input("visited")
  visited ;



  ngOnInit() { }


  

  ElementClick() {
    if(this.elementType == "START") {
      this.node.setStartPoint() ;
    }
  }

  

}
