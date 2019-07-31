import { Component, Input,Output, EventEmitter} from '@angular/core';
import { GeneralStatusService } from '../general-status.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent {

@Input() number:number=0;
@Input() pos:number=0;
@Output() itemEmpty = new EventEmitter<number>();
@Output() itemMine = new EventEmitter<boolean>();
@Output() itemCorrectDetect = new EventEmitter<number>();
@Output() itemNumber = new EventEmitter<number>();

 @Input() isHide:boolean=true;
 isBlock:boolean=false;
 isMine:boolean=false;

  constructor(public GeneralStatusService: GeneralStatusService) {
   }
anim(){
  if(this.isHide && !this.GeneralStatusService.GameOver)
    this.GeneralStatusService.changeFace(2);
}
  show(){
    if(this.isHide && !this.isBlock && !this.GeneralStatusService.GameOver){
      this.GeneralStatusService.changeFace(0);
      this.isHide=false;
      if(this.number==0){
          this.sendResult(this.pos);
      }else
        if(this.number==-1){
          this.itemMine.emit(true);
          this.isMine=true;
        }else
          this.itemNumber.emit(this.pos);
    }
  }
  mark(e:Event){
    if(this.isHide && !this.GeneralStatusService.GameOver){
      this.GeneralStatusService.changeFace(0);
      if(this.isBlock){
        this.isBlock=false;
        //if(this.number==-1)
          this.itemCorrectDetect.emit(1);
      }else{
        this.isBlock=true;
        //if(this.number==-1)
          this.itemCorrectDetect.emit(-1);
      }

    }    
  }
  sendResult(pos:number) {
    this.itemEmpty.emit(pos);
  }

}