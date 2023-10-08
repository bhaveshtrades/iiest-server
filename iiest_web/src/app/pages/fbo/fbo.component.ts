import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {options} from '../../utils/config';
//import {getGeneralData} from '../../services/getdata.service'

@Component({
  selector: 'app-fbo',
  templateUrl: './fbo.component.html',
  styleUrls: ['./fbo.component.scss']
})
export class FboComponent implements OnInit {
  submitted = false;
  waterTestFee = options;
  isDisabled: boolean = true;  
  fboForm: FormGroup = new FormGroup({
    fbo_name: new FormControl(''),
    owner_name: new FormControl(''),
    mobile_no: new FormControl(''),
    email: new FormControl(''),
    state: new FormControl(''),
    distric: new FormControl(''),
    address: new FormControl(''),
    product: new FormControl(''),
    process_fee: new FormControl(''),
    service_name: new FormControl(''),
    client_type: new FormControl(''),
    recipent: new FormControl(''),
    water_test: new FormControl('')
   // water_test_apply : new FormControl(true)
  })

  constructor(
    private formBuilder: FormBuilder,
    //private _getGeneralData: getGeneralData
    ){
      
  }
  ngOnInit(): void {

  }
  get fbo(): { [key: string]: AbstractControl } {
    return this.fboForm.controls;
  }

  waterTestToggel(ckeckVal:any){
    //console.log(ckeckVal.target.checked);
    this.isDisabled = !this.isDisabled
    if(this.isDisabled) {
      this.fboForm.get('water_test')?.disable();
    }else{
      this.fboForm.get('water_test')?.enable();
    }
  }
onSubmit(){
  //this._getGeneralData()
}

}

