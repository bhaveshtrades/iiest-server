import { Component, OnDestroy, OnInit } from '@angular/core';
import { faEye, faPencil, faTrash, faEnvelope, faXmark, faCheck, faFileCsv, faFilePdf, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {UtilitiesService} from 'src/app/services/utilities.service'
import { EmployeeState } from 'src/app/store/state/employee.state';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Employee } from 'src/app/utils/registerinterface';
import { GetEmployee } from 'src/app/store/actions/employee.action';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { EditrecordComponent } from '../editrecord/editrecord.component';

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
  
  
  constructor(
    private _utililitesService: UtilitiesService,
    private modalService: NgbModal,
    private router : Router,
    private store:Store) {
     
  }

  ngOnInit(): void {
    this.fetchAllEmployees();
  }

  fetchAllEmployees(): void {
    this.allEmployees = this._utililitesService.getData();
    this.filter();
    if(Object.keys(this.allEmployees).length == 0){
      console.log('here');
        this.getEmployees();
        this.employees$.subscribe(res => {
          this.allEmployees = res.employeesData;
          this.filter();
        })
    }
    
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
   openModal(){
    //if(!this.isToken){
     this.modalService.open(EditrecordComponent, { size: 'lg', backdrop: 'static' });
   /*  }else{
        this.router.navigateByUrl('/home')
    } */
  }
}
