import { Component, OnInit,Input } from '@angular/core';
import { GeneralStatusService } from '../general-status.service';

enum URLIMG {"assets\\img\\smileFace.png"=0,"assets\\img\\deadFace.png",
"assets\\img\\surpriceFace.png"}
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  @Input() minesLeft:number=1;
  time:number=0;
  interval;

  URLImgName: string = URLIMG[0];
  URLImgArray:string[]=["assets\\img\\smileFace.png",
  "assets\\img\\deadFace.png","assets\\img\\surpriceFace.png","assets\\img\\Win2Face.png"];

  constructor(public GeneralStatusService: GeneralStatusService) { }

  ngOnInit() {
    this.startTimer();
  }

  changeFace(){
    this.URLImgName= URLIMG[this.GeneralStatusService.getFace()];
  }
  refreshPage(){
    location.reload();
  }


startTimer() {
  this.interval = setInterval(() => {
    this.time++;
    if(this.GeneralStatusService.GameOver)
      this.pauseTimer();
  },1000)
}
pauseTimer() {
  clearInterval(this.interval);
}


}

