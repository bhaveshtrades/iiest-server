import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss']
})
export class RecipientComponent implements OnInit {
  @Input() public fboData:any;
  recipientData :any;
  constructor( public activeModal: NgbActiveModal){
    
  }
ngOnInit(): void {
  console.log(this.fboData.length)
  this.recipientData = this.fboData;
  console.log(this.recipientData);
}
  closeModal(){
    this.activeModal.close();
  }
}
