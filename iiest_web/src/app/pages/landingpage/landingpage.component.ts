import { Component } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent {


constructor(){
  const bodyElement = document.body;
  bodyElement.classList.remove('app');
}
  

}