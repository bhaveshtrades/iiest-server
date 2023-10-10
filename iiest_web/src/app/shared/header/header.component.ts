import { Component, OnInit,Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';
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
  @Input() item:boolean;
  @Input() userdata:any;
  msg:Subscription;
  blockMsg:boolean = true;
  empName: any;
  constructor(private _registerService: RegisterService){
    let isLoggedIn = this._registerService.isLoggedIn();
    console.log(isLoggedIn);
    if(isLoggedIn){
    let loggedInUserData:any = this._registerService.LoggedInUserData(); 
    loggedInUserData = JSON.parse(loggedInUserData);
    this.userdata  = loggedInUserData.employee_name;
    this.empName = loggedInUserData.employee_name;
    console.log(this.empName);
    }
    const message = interval(2000);
    this.msg = message.subscribe( (res)=> {
      if(res >=2){
        this.blockMsg = false;
        this.msg.unsubscribe()
      }
    })
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
