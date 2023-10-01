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
    const message = interval(2000);
    this.msg = message.subscribe( (res)=> {
      if(res >=2){
        this.blockMsg = false;
        this.msg.unsubscribe()
      }
    })
  }
  ngOnInit(){ 
      //let loggedInUserData:any = this._registerService.LoggedInUserData(); 
      //loggedInUserData = JSON.parse(loggedInUserData)
      this.empName = this.userdata.employee_name;
  }
 
  toggleClass = (event:any) => {
   this.toggelShow = !this.toggelShow ;
    event.target.classList.toggle('show');
  }
  logout(){
    this._registerService.signout();
  }
}
