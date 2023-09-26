import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
  
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  @ViewChild('myModal') myModal: ElementRef;
  constructor() {}
  
  ngOnInit() {}
  
  closeModal() {
    this.myModal.nativeElement.style.display = 'none'
  }
}
