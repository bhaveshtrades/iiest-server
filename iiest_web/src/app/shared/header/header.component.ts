import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toggelShow:boolean= false;
  toggelNotification:boolean=false;
  toggelStyle:object={
    'position': 'absolute',
    'inset': '0px 0px auto auto', 
    'margin': '0px; transform: translate3d(0.666667px, 28px, 0px)'
  }
  ngOnInit(){ }

  toggleClass = (event:any) => {
   this.toggelShow = !this.toggelShow ;
    event.target.classList.toggle('show');
  }

}
