import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    username: string = '';
    password: string = '';

    constructor(private _registerService: RegisterService ){}

    submitForm(){
      const loginData = {
        username: this.username,
        password: this.password
      }

      this._registerService.loginEmployee(loginData)
    .subscribe((response: any) => {
        console.log(response);
    });
    }
}
