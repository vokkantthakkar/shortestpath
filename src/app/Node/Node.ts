export class Node {
    x: number ;
    y: number ;
  
    distance: number | null;
    distanceFrom: Node ;
  
    StartPoint: boolean ;
    EndPoint: boolean ;
    isVisited: boolean ;
    isBlocked: boolean ;
    isInShortestPath: boolean ;
    isInProgress : boolean ;
  
    
    constructor() {
      this.x = 0 ;
      this.y = 0 ;
      this.distance = null ;
      this.distanceFrom = null ;
      this.StartPoint = null ;
      this.EndPoint = null ;
      this.isVisited = null ;
      this.isBlocked = null ;
      this.isInShortestPath = null ;
      this.isInProgress = null ;
    }

    setPosition(row :number,column:number){
      this.y = row ;
      this.x = column ;
    }
  
    setStartPoint() {
      this.StartPoint = true ;
      this.distance = 0 ;
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
    
    updateDistance(visitingNode : Node) {
      let newDistance = visitingNode.distance?visitingNode.distance+1:1 ;
      if (!this.isBlocked && !this.isVisited && (this.distance == null || this.distance > newDistance)){
        this.distance = newDistance;
        this.distanceFrom = visitingNode;
    }
    return this;
    }
   
  
  }