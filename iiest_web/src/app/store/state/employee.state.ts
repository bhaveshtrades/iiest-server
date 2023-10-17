import { Injectable } from "@angular/core";
import { Selector,Action, StateContext, State } from "@ngxs/store";

import { Employee } from "src/app/utils/registerinterface";
import { GetEmployee } from "../actions/employee.action";
import { GetdataService } from "src/app/services/getdata.service";
import { tap } from "rxjs";

//State Model
export class EmployeeStateModel {
    employees : Employee[];
    employeeLoaded : boolean
}

//State
@State<EmployeeStateModel>({
    name : 'employee',
    defaults :{
        employees:[],
        employeeLoaded :false
    }
})

@Injectable()

export class EmployeeState {
    constructor(private _getDataService: GetdataService){}

    @Selector()
    static GetEmployeeList(state:EmployeeStateModel){
        return state.employees;
    }

    //Get Loaded employee Info
    @Selector()
    static employeeLoaded(state:EmployeeStateModel){
        return state.employeeLoaded;
    }
    @Action(GetEmployee)
    getEmployees({getState, setState}:StateContext<EmployeeStateModel>){
        console.log('State Action');
        return this._getDataService.getEmployeeData().pipe(tap(res => {
            console.log(res);
            const state = getState();
            setState({
                ...state,
                employees:res,
                employeeLoaded:true
            })
        }))
        
       /*  this._getDataService.getGenericData().subscribe( {
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