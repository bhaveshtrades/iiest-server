import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetdataService } from 'src/app/services/getdata.service';
import { GetEmployee } from 'src/app/store/actions/employee.action';
import { Employee } from '../../utils/registerinterface';
import { EmployeeState } from 'src/app/store/state/employee.state';
import { RegisterService } from 'src/app/services/register.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  employees: Employee;
  genericData:any;
  data:any;
  empName:String;
  @Select(EmployeeState.GetEmployeeList) employees$:Observable<Employee>;
  constructor(
    private _getDataService: GetdataService,
    private _registerService: RegisterService,
    private store:Store
  ){ }
  ngOnInit(): void {
      this.getEmployees();
      this.employees$.subscribe(res => {
       this.data = Object.values(res)[0];
      }) 
      let loggedInUserData:any = this._registerService.LoggedInUserData(); 
      loggedInUserData = JSON.parse(loggedInUserData)
      this.empName = loggedInUserData.employee_name;
  }

getEmployees(){
  this.store.dispatch(new GetEmployee());
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
}
