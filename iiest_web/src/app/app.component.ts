import { Component } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'iiest_new';
  showHeader: boolean = true;

constructor(private router: Router){
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

}
