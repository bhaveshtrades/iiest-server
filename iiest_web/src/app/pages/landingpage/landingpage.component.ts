import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent {

constructor(private modalService: NgbModal){
  const bodyElement = document.body;
  bodyElement.classList.remove('app');
}
  
openModal(){
   this.modalService.open(LoginComponent);
}

}
