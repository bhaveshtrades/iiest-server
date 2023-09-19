import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

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

    // adding form validators
    constructor(private http: HttpClient){}

    signupForm=new FormGroup({
        employee_name: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        username: new FormControl('',[Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        employee_id: new FormControl('', [Validators.required]),
        portal_type: new FormControl('', [Validators.required]),
        department: new FormControl('', [Validators.required]),
        dob: new FormControl('', [Validators.required]),
        designation:new FormControl( '', [Validators.required]),
        salary: new FormControl('', [Validators.required]), // Set a default value
        grade_pay: new FormControl('', [Validators.required]), // Set a default value
        company_name: new FormControl('', [Validators.required]),
        project_name: new FormControl('', [Validators.required]),
        doj: new FormControl('', [Validators.required]),
        email:new FormControl ('', [Validators.required, Validators.email]),
        contact_no: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
        alternate_contact: new FormControl('', [Validators.pattern(/^[0-9]{10}$/)]),
        address: new FormControl('', [Validators.required]),
        zip_code: new FormControl(0, [Validators.required,Validators.pattern(/^[0-9]{6}$/)])
      

    });



    // signupForm: FormGroup;


    // constructor(private http: HttpClient, private fb:FormBuilder){
    //   this.signupForm = this.fb.group({
    //     employee_name: ['', Validators.required],
    //     gender: ['', Validators.required],
    //     username: ['', Validators.required],
    //     password: ['', [Validators.required, Validators.minLength(6)]],
    //     employee_id: ['', Validators.required],
    //     portal_type: ['', Validators.required],
    //     department: ['', Validators.required],
    //     dob: ['', Validators.required],
    //     designation: ['', Validators.required],
    //     salary: [0, Validators.required], // Set a default value
    //     grade_pay: [500, Validators.required], // Set a default value
    //     company_name: ['', Validators.required],
    //     project_name: ['', Validators.required],
    //     doj: ['', Validators.required],
    //     email: ['', [Validators.required, Validators.email]],
    //     contact_no: [0, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    //     alternate_contact: [0, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
    //     address: ['', Validators.required],
    //     zip_code: [0, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    //   });
    // }

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
