import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss']
})
export class RecipientComponent implements OnInit {
  @Input() public fboData: any;
  fboID :any;
  recipientData: any;
  addRecipient : any;
  submitted = false;
  recipientform: FormGroup = new FormGroup({
    name: new FormControl(''),
    phoneNo: new FormControl(''),
    aadharNo: new FormControl('')
  });
  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private _registerService: RegisterService,
    private _toastrService: ToastrService) {

  }
  ngOnInit(): void {
   // console.log(this.fboData)
    this.fboID = this.fboData._id;
    this.recipientData = this.fboData.recipientDetails;
    console.log(this.fboID, this.recipientData);
    this.recipientform = this.formBuilder.group(
      {
        name: ['', Validators.required],
        phoneNo: ['',
          [
            Validators.required,
            Validators.pattern(/^[0-9]{10}$/)
          ]],
        aadharNo: ['',
          [
            Validators.required,
            Validators.pattern(/^[0-9]{12}$/)
          ]]
      });

  }
  get recipient(): { [key: string]: AbstractControl } {
    return this.recipientform.controls;
  }
  //Form Submit Methode
  onSubmit() {
    this.submitted = true;
    if (this.recipientform.invalid) {
      return;
    }
    this.addRecipient = this.recipientform.value;
      this._registerService.addFboRecipent(this.fboID, this.addRecipient).subscribe({
        next: (res)=>{
          if(res.success){
            this._toastrService.success('Record edited successfully', res.message);
            //this.backToRegister();
          }
        },
        error: (err)=>{
          let errorObj = err.error;
          if(errorObj.userError){
          this._registerService.signout();
          }else if(errorObj.contactErr){
          this._toastrService.error('Message Error!', errorObj.contactErr);
          }else if(errorObj.emailErr){
          this._toastrService.error('Message Error!', errorObj.emailErr);
          }else if(errorObj.addressErr){
          this._toastrService.error('Message Error!', errorObj.addressErr);
          }
        }
      })
  }
  closeModal() {
    this.activeModal.close();
  }
}
