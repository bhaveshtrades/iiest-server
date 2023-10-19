import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { waterTestFee, clientType, paymentMode, licenceType } from '../../utils/config';
import { RegisterService } from '../../services/register.service';
import { GetdataService } from '../../services/getdata.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-fbo',
  templateUrl: './fbo.component.html',
  styleUrls: ['./fbo.component.scss']
})
export class FboComponent implements OnInit {
  userName: string = '';
  userData: any;
  objId: string;
  editedData: any;
  parsedUserData: any;
  submitted = false;
  waterTestFee = waterTestFee;
  clientType = clientType;
  paymentMode = paymentMode;
  licenceType = licenceType;
  isDisabled: boolean = true;
  fboGeneralData: any;
  productList: string[] = [];
  productName: any;
  processAmnt: any;
  serviceName: any;
  addFbo: any;
  isFoscos :boolean = false;
  recipientORshop: string = 'Recipient';
  isEditMode : boolean = false;
  formType :string = "Registration";

  fboForm: FormGroup = new FormGroup({
    fbo_name: new FormControl(''),
    owner_name: new FormControl(''),
    owner_contact: new FormControl(''),
    email: new FormControl(''),
    state: new FormControl(''),
    district: new FormControl(''),
    address: new FormControl(''),
    product_name: new FormControl(''),
    processing_amount: new FormControl(''),
    service_name: new FormControl(''),
    client_type: new FormControl(''),
    recipient_no: new FormControl(''),
    water_test_fee: new FormControl(''),
    payment_mode : new FormControl(''),
    createdBy: new FormControl(''),
    license_category :new FormControl(''),
    license_duration : new FormControl(''),
    total_amount: new FormControl('')
  })


  constructor(
    private formBuilder: FormBuilder,
    private _getFboGeneralData: GetdataService,
    private _registerService: RegisterService,
    private _toastrService: ToastrService
  ) {
    this.getFboGeneralData();
  }
  ngOnInit(): void {

    this.userData = this._registerService.LoggedInUserData(); 
    this.parsedUserData = JSON.parse(this.userData)
    this.userName = this.parsedUserData.employee_name;

    this.fboForm = this.formBuilder.group(
      {
        fbo_name: ['', Validators.required],
        owner_name: ['', Validators.required],
        owner_contact: ['',
          [
            Validators.required,
            Validators.pattern(/^[0-9]{10}$/)
          ]],
        email: ['',
          [
            Validators.required,
            Validators.email,
          ]],
        state: ['', Validators.required],
        district: ['', Validators.required],
        address: ['', Validators.required],
        product_name: ['', Validators.required],
        processing_amount: ['', Validators.required],
        service_name: ['', Validators.required],
        client_type: ['', Validators.required],
        recipient_no: ['', Validators.required],
        water_test_fee: [''],
        payment_mode: ['', Validators.required],
        createdBy: ['', Validators.required],
        license_category:[''],
        license_duration:[''],
        total_amount:['', Validators.required] 
      });

      this.fboForm.patchValue({createdBy : this.parsedUserData.employee_id})
      

  }
  get fbo(): { [key: string]: AbstractControl } {
    return this.fboForm.controls;
  }

  setRequired() {
		return [Validators.required];
	}
  //Form Submit Methode
  onSubmit() {
    this.submitted = true;
    if (this.fboForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.fboForm.value, null, 2));
    this.addFbo = this.fboForm.value;
    this._registerService.addFbo(this.addFbo)
      .subscribe((response: any) => {
        if (response.success) {
          this._toastrService.success('Message Success', response.message)
        } else {
          this._toastrService.error('Message Error!', response.message);
        }
        //console.log(response);
      });
      this.onReset();
  }


  getEmployees() {
    /* this._getDataService.getGenericData().subscribe( {
      next: (res) => { 
        console.log(res)
      },
      error: (err) => {
        let errorObj = err.error
        this.error = true;
        this.errorMgs = errorObj.message
      },
      complete: () =>{ 
        //console.info('complete')
      } 
  }) */
  }

//Get Fbo General Data
  getFboGeneralData() {
    this._getFboGeneralData.getFboGeneralData().subscribe({
      next: (res) => {
        this.fboGeneralData = res.product_name;
        console.log(this.fboGeneralData);
        this.fboGeneralData = Object.entries(this.fboGeneralData).map(([key, value]) => ({ key, value }));
        this.productList = Object.keys(res.product_name);
      },
      error: (err) => {
        let errorObj = err.error
        //this.error = true;
        //this.errorMgs = errorObj.message
      },
      complete: () => {
        //console.info('complete')
      }
    })
  }

//Reset the form
  onReset(): void {
    this.submitted = false;

    this.fboForm.reset();
  }

//Get Product List
  getProduct(event: any) {
    this.productName = event.target.value;
    var filtered = this.fboGeneralData.filter((a: any) => a.key == this.productName)
    filtered = filtered[0].value;
    this.processAmnt = Object.values(filtered.processing_amount);
    this.serviceName = Object.values(filtered.service_name);

    if( this.productName == 'Foscos Training'){
      this.recipientORshop = 'Shops';
      this.isFoscos = true;  
      this.fboForm.controls['license_category'].setValidators(this.setRequired());   
      this.fboForm.controls['license_duration'].setValidators(this.setRequired());  
    }else {
      this.isFoscos = false; 
      this.fboForm.controls['license_category'].clearValidators();
      this.fboForm.controls['license_duration'].clearValidators();
    }
    

  }
 

serviceType(event:any){
  console.log(event.target.value)
}
backToRegister(){
  this.submitted = false;
  this.isEditMode = false;
  this.fboForm.reset();
}
isEditRecord(param:any){
  console.log(param.Record);
  this.isEditMode = param.isEditMode;
  const record = param.Record;
  this.objId = record._id
  console.log(record);
  this.formType = "Edit"
  this.fboForm.setValue({
    fbo_name: record.fbo_name,
    owner_name: record.owner_name,
    owner_contact: record.owner_contact,
    email: record.email,
    state: record.state,
    district: record.district,
    address: record.address,
    product_name: record.product_name,
    processing_amount: record.processing_amount,
    service_name: record.service_name,
    client_type: record.client_type,
    recipient_no: record.recipient_no,
    water_test_fee: record.water_test_fee,
    payment_mode : record.payment_mode,
    createdBy: record.createdBy,
    license_category :record.license_category,
    license_duration : record.license_duration,
    total_amount: record.total_amount
  })
}

}

