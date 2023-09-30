import { Component, OnInit, Input } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'iiest_new';
  showHeader: boolean = true;
  empName:string;
  loggedInUserData:any;
  
constructor(
  private router: Router,
  private _registerService: RegisterService
  ){
  router.events.subscribe((val) => {
    if (val instanceof NavigationEnd) {
      if (val.url == '/' || val.url == '/main') {
        this.showHeader = false;
      } else {
        this.showHeader = true;
      }
    }
  });

}
ngOnInit(): void {
  this.loggedInUserData= this._registerService.LoggedInUserData(); 
  this.loggedInUserData = JSON.parse(this.loggedInUserData)
  this.empName = this.loggedInUserData.employee_name;
}
}
