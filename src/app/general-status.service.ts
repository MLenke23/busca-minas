import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralStatusService {

  faceStatus:number=0;
  correctMineDetect:number=0;
  public GameOver:boolean=false;

  constructor() { }

  public changeFace(n:number){
    this.faceStatus=n;
  }
  getFace(){
    return this.faceStatus;
  }

}
