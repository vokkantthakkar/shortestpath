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

    setPosition(x:number,y:number){
      this.row = y ;
      this.column = x ;
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
  
   
  
  }