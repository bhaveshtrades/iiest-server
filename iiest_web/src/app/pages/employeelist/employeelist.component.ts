import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetdataService } from 'src/app/services/getdata.service';
import { faEye, faPencil, faTrash, faEnvelope, faXmark, faCheck, faFileCsv, faFilePdf, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
//import { ngxCsv } from 'ngx-csv/ngx-csv.js';
import {UtilitiesService} from 'src/app/services/utilities.service'
import { EmployeeState } from 'src/app/store/state/employee.state';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Employee } from 'src/app/utils/registerinterface';
import { GetEmployee } from 'src/app/store/actions/employee.action';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit, OnDestroy {

  @Select(EmployeeState.GetEmployeeList) employees$:Observable<Employee>;
  @Select(EmployeeState.employeeLoaded) employeeLoaded$:Observable<boolean>
  empLoadedSub:Subscription;
  allEmployees: any;
  filteredEmployees: any;
  searchQuery: string = '';
  selectedFilter: string = 'byName';
  pageNumber: number = 1;
  isSearch: boolean = false;
  faEye = faEye;
  faPencil = faPencil;
  faTrash = faTrash;
  faEnvelope = faEnvelope;
  faXmark = faXmark;
  faCheck = faCheck;
  faFileCsv = faFileCsv;
  faFilePdf = faFilePdf;
  faMagnifyingGlass = faMagnifyingGlass;
  //ngx-csv Options
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Your title',
    useBom: true,
    noDownload: false,
    headers: [
      "Username","Employee Id", "Name" ,"Gender","Date-of-Birth", "Email",
      "Address","Zip", "Contact", "Company Name", "Department", "Designation", "Date-0f-Joining",
      "Salary", "Grade Pay", "Portal Type", "Project Name", "State","City","Country"]
  };
  
  constructor(
    private getDataService: GetdataService, 
    private _utililitesService: UtilitiesService,
    private store:Store) {
     
  }

  ngOnInit(): void {
    this.fetchAllEmployees();
  }

  fetchAllEmployees(): void {
    this.allEmployees = this._utililitesService.getData();
    if(Object.keys(this.allEmployees).length == 0){
        this.getEmployees();
        this.employees$.subscribe(res => {
          this.allEmployees = res.employeesData;
          this.filter();
        })
    }
    /* this.getDataService.getEmployeeData().subscribe(res => {
      this.allEmployees = res.employeesData.map((emp: any, index: number) => ({ ...emp, serialNumber: index + 1 }));
      this.allEmployees.map((item:any, index:number) => {
       delete(item.password);
       delete(item.id_num);
       delete(item._id);
       delete(item.__v)
       //console.log(item.state);
      });
      //console.log(this.allEmployees)
      this.filter();
    }) */
    this.filter();
  }

  filter(): void {
    //console.log(this.searchQuery)
    if (!this.searchQuery) {
      this.isSearch =false;
      this.filteredEmployees = this.allEmployees;
    } else {
      if (this.selectedFilter === 'byName') {
        this.filteredEmployees = this.allEmployees.filter((emp: any) => emp.employee_name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      } else if (this.selectedFilter === 'byEmail') {
        this.filteredEmployees = this.allEmployees.filter((emp: any) => emp.email.toLowerCase().includes(this.searchQuery.toLowerCase()))
      } else if (this.selectedFilter === 'byEmpId') {
        this.filteredEmployees = this.allEmployees.filter((emp: any) => emp.employee_id.toLowerCase().includes(this.searchQuery.toLowerCase()))
      } else if (this.selectedFilter === 'byContact') {
        this.filteredEmployees = this.allEmployees.filter((emp: any) => emp.contact_no.toString().includes(this.searchQuery.toString()))
      }
    }
  }

  onSearchChange(): void{
    this.pageNumber = 1;
    this.isSearch = true;
    this.filter();
  }

  onTableDataChange(event: any) {
    this.pageNumber = event;
    this.filter();
  }
  //Export To CSV
  exportToCsv() {
    //new ngxCsv(this.allEmployees, 'Report', this.options)
  }

  getEmployees(){
   this.empLoadedSub = this.employeeLoaded$.subscribe(loadedEmployee =>{
       if(!loadedEmployee){
         this.store.dispatch(new GetEmployee());
       }
     })
   }
   ngOnDestroy(): void {
     this.empLoadedSub.unsubscribe();
   }
}
