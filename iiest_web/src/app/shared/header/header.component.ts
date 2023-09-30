import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

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
  constructor(private _registerService: RegisterService){
  
  }
  ngOnInit(){ }

  toggleClass = (event:any) => {
   this.toggelShow = !this.toggelShow ;
    event.target.classList.toggle('show');
  }
  logout(){
    this._registerService.signout();
  }
}
