import { Component, OnInit} from '@angular/core';
import { loginEmployee, forgotPassword } from '../../utils/registerinterface'
import { RegisterService } from '../../services/register.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginemployee :loginEmployee;
    forgotpassword :forgotPassword;
     /*Login form Group*/
    form: FormGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });

    /*Forgot password form Group*/
    formFp:FormGroup = new FormGroup({
        email: new FormControl('')
    });
    submitted = false;
    submittedFP =false;
    constructor(
      private formBuilder: FormBuilder,
      private _registerService: RegisterService,
      public activeModal: NgbActiveModal,
      private modalService: NgbModal
      ){}

    ngOnInit(): void {
      this.form = this.formBuilder.group(
        {
          username: ['', Validators.required],
          password: ['', Validators.required]
        });

      this.formFp = this.formBuilder.group(
        {
          email: ['',
          [
            Validators.required,
            Validators.email,
          ],
        ]
        });
    }

    get f(): { [key: string]: AbstractControl } {
      return this.form.controls;
    }
    get forgotPass(): { [key: string]: AbstractControl } {
      return this.formFp.controls;
    }
/**********************Login Methode Start *******************/
    loginForm(){
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }
      this._registerService.loginEmployee(this.loginemployee)
      .subscribe((response: any) => {
          console.log(response);
      });
    }
/**********************Forgot Password modal open *******************/
    openFpModal(fp:any){
      this.activeModal.close();
      this.modalService.open(fp, { size: 'md', backdrop: 'static' });     
    }
/**********************Reset Password modal open *******************/
    resetPassword(){
      this.submittedFP = true;
      if (this.formFp.invalid) {
        return;
      }
      this._registerService.loginEmployee(this.loginemployee)
      .subscribe((response: any) => {
          console.log(response);
      });

    }

    closeModal(){
      this.activeModal.close();
    }
}

