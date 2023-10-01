import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private router :Router){

  }
@Input() userData:any;
toggelShow:boolean= false;
toggleClass(event:any){
  this.toggelShow = !this.toggelShow ;
    event.target.classList.toggle('show');
}

}
