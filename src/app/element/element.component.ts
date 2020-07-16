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
  @Input("boxAction")
  boxAction:string = null ;
  @Input("visited")
  visited ;



  ngOnInit() { }

  createPageActionPayload(action: string, data: any){
    return {
      "action": action,
      "data": data
    }
  }

  ElementClick() {

  }

}
