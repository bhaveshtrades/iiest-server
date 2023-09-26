import { Component, OnInit } from '@angular/core';
import { AddEmployee } from '../../utils/registerinterface'
import { DatePipe } from '@angular/common';
import { FormGroup, Validators, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import Validation from '../../utils/validation'
import { NgbDate, NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  addemployee : AddEmployee;
  dob: NgbDateStruct;
  form: FormGroup = new FormGroup({
    employee_name: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl(''),
    //username: new FormControl(''),
    email: new FormControl(''),
    //password: new FormControl(''),
    //confirmPassword: new FormControl(''),
    company_name: new FormControl(''),
    //employee_id: new FormControl(''),
    portal_type: new FormControl(''),
    project_name: new FormControl(''),
    doj: new FormControl(''),
    department: new FormControl(''),
    designation: new FormControl(''),
    salary: new FormControl(''),
    grade_pay: new FormControl(''),
    contact_no: new FormControl(''),
    alternate_contact: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    zip_code: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;
  dobValue: Date;
  dojValue: Date;
  constructor(
    private formBuilder: FormBuilder,
    private calendar: NgbCalendar,
    private datePipe: DatePipe,
    private _registerService: RegisterService,
    private route:Router) {
  }

  ngOnInit(): void {
    console.log(this._registerService.msg);
    this.dobValue;
    this.dojValue;
    this.form = this.formBuilder.group(
      {
        employee_name: ['', Validators.required],
        gender: ['', Validators.required],
        dob: ['', Validators.required],
        /*username: ['',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],*/
        email: ['',
          [
            Validators.required,
            Validators.email,
          ],
        ],
        /*password: ['',
          [
            Validators.required,
            Validators.minLength(6)
          ],
        ],
        confirmPassword: ['', Validators.required],*/
        company_name: ['', Validators.required],
        /*employee_id: ['IIEST/FD/240, IIEST/BC/241', Validators.required],*/
        portal_type: ['', Validators.required],
        doj: ['', Validators.required],
        project_name: ['', Validators.required],
        department: ['', Validators.required],
        designation: ['', Validators.required],
        salary: ['', Validators.required], // Set a default value
        grade_pay: ['', Validators.required], // Set a default value
        contact_no: ['',
          [
            Validators.required,
            Validators.pattern(/^[0-9]{10}$/)
          ]
        ],
        alternate_contact: ['',
          [
            Validators.required,
            Validators.pattern(/^[0-9]{10}$/)
          ]
        ],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        zip_code: ['',
          [
            Validators.required,
            Validators.pattern(/^[0-9]{6}$/)
          ],
        ],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
    console.log(this.calendar.getToday());

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.form.value.dob = this.datePipe.transform(this.form.value.dob, 'yyyy-MM-dd');
    this.form.value.doj = this.datePipe.transform(this.form.value.doj, 'yyyy-MM-dd');
    console.log(JSON.stringify(this.form.value, null, 2));
    this.addemployee = this.form.value;
    this._registerService.addEmployee(this.addemployee)
    .subscribe((response: any) => {
        console.log(response);
    });
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
