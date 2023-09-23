import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddEmployee } from '../utils/registerinterface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  msg: string = "Hello Welcome";

  constructor(private http: HttpClient) { }

  /*public saveUser(user: User): Observable<any> {
    const url = 'https://reqres.in/api/users';
    return this.http.post<any>(url, user);
  }*/

  public addEmployee(addemployee: AddEmployee): Observable<any> {
    const url = 'http://localhost:3000/auth/staffentry';
    return this.http.post<any>(url, addemployee);
  }

}
