import { Component, OnInit} from '@angular/core';
import { GeneralStatusService } from '../general-status.service';


@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css']
})
export class MainGameComponent implements OnInit {

  rows: number[] = Array(6).fill(0);
  columns:number[]= Array(6).fill(0);
  mat:number[]=[];
  matAdvice:boolean[]=[];
 
  minesinStage:number=6;
  cantMines:number;
  correctMinesinStage:number;
  cantBloquestoWin:number;
  

  constructor(public GeneralStatusService: GeneralStatusService) {
    this.cantMines=this.minesinStage;
    this.correctMinesinStage=this.minesinStage;
    this.cantBloquestoWin=this.rows.length*this.columns.length
    -this.minesinStage;
  }

  ngOnInit() {
    this.setMatriz();
    this.putMine();
    this.detectMines();
  }

  correctDetect(n:number){
    this.minesinStage+=n;
    this.correctMinesinStage+=n;//out
    //if(this.correctMinesinStage==0){
      //this.unHideAll();
     // this.GeneralStatusService.changeFace(3);
   // }
  }

  resultMine(b:boolean){
    this.unHideAll();
    this.GeneralStatusService.changeFace(1);
    this.GeneralStatusService.GameOver=true;
  }

  resultNumber(pos:number){
    if(this.matAdvice[pos]==true)
      this.checkifWin(pos);
    this.matAdvice[pos]=false;
  }

  resultEmpty(pos:number){  

   if(this.matAdvice[pos]==true)
      this.checkifWin(pos);
   this.matAdvice[pos]=false;

   this.checkEmptyUP(pos);
   this.checkEmptyDOWN(pos);
   this.checkEmptyLEFT(pos);
   this.checkEmptyRIGHT(pos);
 
  }
  checkEmptyUP(pos:number){
      while(pos-this.columns.length>=0 && this.mat[pos]==0){ 
            pos-=this.columns.length;
            if(this.matAdvice[pos])
               this.checkifWin(pos);
            this.matAdvice[pos]=false;
          
            this.checkEmptyLEFT(pos);
            this.checkEmptyRIGHT(pos);
      }
     

  }
  checkEmptyDOWN(pos:number){
       while(pos+this.columns.length<this.columns.length*this.rows.length && this.mat[pos]==0){
        pos+=this.columns.length;
        if(this.matAdvice[pos])
        this.checkifWin(pos);
        this.matAdvice[pos]=false;
         this.checkEmptyLEFT(pos);
         this.checkEmptyRIGHT(pos);
     }
  }
  checkEmptyRIGHT(pos:number){
     while(pos+1<this.rows.length*(Math.floor(pos/this.rows.length)+1) && this.mat[pos]==0){
        pos++; 
       
        if(this.matAdvice[pos])
        this.checkifWin(pos);
        this.matAdvice[pos]=false;
     }
  }
  checkEmptyLEFT(pos:number){
     while(pos-1>=this.rows.length*(Math.floor(pos/this.rows.length)) && this.mat[pos]==0){  
        pos--;
        if(this.matAdvice[pos])
        this.checkifWin(pos);
        this.matAdvice[pos]=false;       
     }
  }

  checkifWin(pos:number){
    this.cantBloquestoWin--;
    if(this.cantBloquestoWin==0){
      this.GeneralStatusService.changeFace(3);
      this.GeneralStatusService.GameOver=true;
      this.minesinStage=0;
    }
  }

  detectMines(){
    for(let i=0;i<this.rows.length;i++){
      for(let j=0;j<this.columns.length;j++){
        let pos=i*this.rows.length+j;
        if(this.mat[pos]!=-1){
            //console.log(this.rows.length*(i));
            if(pos+1<this.rows.length*(i+1) 
            && this.mat[pos+1]==-1)//right test
            {
              this.mat[pos]++;
            }
            if(pos-1>=this.rows.length*(i)
            && this.mat[pos-1]==-1)//left test
            {
              this.mat[pos]++;
            }
            if(pos-this.columns.length>=0
            && this.mat[pos-this.columns.length]==-1)//up test
            {
              this.mat[pos]++;
            }
            if(pos+this.columns.length<this.columns.length*this.rows.length
            && this.mat[pos+this.columns.length]==-1)//down test
            {
              this.mat[pos]++;
            }

            if(pos+1<this.rows.length*(i+1) && pos+this.columns.length<this.columns.length*this.rows.length
                && this.mat[pos+this.columns.length+1]==-1)//check rigth bot
                  this.mat[pos]++;

             if(pos-1>=this.rows.length*(i) && pos+this.columns.length<this.columns.length*this.rows.length
                && this.mat[pos+this.columns.length-1]==-1)//check left bot
                  this.mat[pos]++;
            
             if(pos+1<this.rows.length*(i+1) &&pos-this.columns.length>=0
                && this.mat[pos-this.columns.length+1]==-1)//check rigth bot
                  this.mat[pos]++;

             if(pos-1>=this.rows.length*(i)&& pos-this.columns.length>=0
                && this.mat[pos-this.columns.length-1]==-1)//check left bot
                  this.mat[pos]++;
        }

      }
    }
  }

   putMine(prob=.15){
    for(let i=0;i<this.rows.length;i++){
      for(let j=0;j<this.columns.length;j++){
        if(Math.random()<prob && this.cantMines>0){
           this.cantMines--;
           this.mat[i*this.rows.length+j]=-1;
        }
      }
    }
    if(this.cantMines>0) 
      this.putMine(.30);
    if(this.cantMines>0)
      this.putMine(.7);
    if(this.cantMines>0)
      this.putMine(.9);
  }

  setMatriz(){
    for(let i=0;i<this.rows.length;i++){
      for(let j=0;j<this.columns.length;j++){
        this.mat.push(0);
        this.matAdvice.push(true);
      }
    }
  }

  unHideAll(){
    for(let i=0;i<this.rows.length;i++){
      for(let j=0;j<this.columns.length;j++){
        this.matAdvice[i*this.rows.length+j]=false;
      }
    }
  }

}