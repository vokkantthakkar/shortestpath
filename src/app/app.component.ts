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

  constructor(private fb: FormBuilder) {
    //this.options = fb.group({color : this.elevationControl}) ;
    this.options = this.fb.group({
      "Rows" :[null,Validators.compose([Validators.required, Validators.min(5)])],
      "Columns" :[null,Validators.compose([Validators.required, Validators.min(5)])],
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
}