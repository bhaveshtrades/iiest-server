import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    employee_name: string = '';
    gender: string = '';
    username: string = '';
    password: string = '';
    employee_id: string = '';
    portal_type: string = '';
    department: string = '';
    dob: string = '';
    designation: string = '';
    salary: number = 0;
    grade_pay: number = 500;
    company_name: string = '';
    project_name: string = '';
    doj: string = '';
    email: string = '';
    contact_no: number = 0;
    alternate_contact: number = 0;
    address: string = '';
    zip_code: number = 0;

    constructor(private http: HttpClient){}

    submitForm(){
      const postData = {
        employee_name: this.employee_name,
        gender: this.gender,
        username: this.username,
        password: this.password,
        employee_id: this.employee_id,
        portal_type: this.portal_type,
        department: this.department,
        dob: this.dob,
        designation: this.designation,
        salary: this.salary,
        grade_pay: this.grade_pay,
        company_name: this.company_name,
        project_name: this.project_name,
        doj: this.doj,
        email: this.email,
        contact_no: this.contact_no,
        alternate_contact: this.alternate_contact,
        address: this.address,
        zip_code: this.zip_code
      }

      console.log(postData)

      this.http.post('http://localhost:3000/auth/staffentry', postData).subscribe(
        (response)=>{
          console.log('POST request successful: ', response)
        },
        (error)=>{
          console.log('POST Request Error', error)
        }
      )
    }
}
