import { Injectable } from "@angular/core";
import { Selector,Action, StateContext, State } from "@ngxs/store";

import { Employee } from "src/app/utils/registerinterface";
import { DeleteEmployee, GetEmployee, UpdateEmployee } from "../actions/employee.action";
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
            const state = getState();
            setState({
                ...state,
                employees:res.employeesData,
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
    @Action(UpdateEmployee)
    updateEmployee({getState, setState}:StateContext<EmployeeStateModel>, {objId, payload}: UpdateEmployee){
        
        const state = getState();
        const updatedEmployees = state.employees.map((employee: any)=>
            employee._id === objId ? {...employee, ...payload} : employee
        )

        setState({
            ...state,
            employees: updatedEmployees
        })
    }

    @Action(DeleteEmployee)
    deleteEmployee({getState, setState}:StateContext<EmployeeStateModel>, {objId}: DeleteEmployee){

        const state = getState();
        const updatedEmployeeList = state.employees.filter((emp: any) => emp._id !== objId);

        setState({
            ...state,
            employees: updatedEmployeeList
        })
    }
}