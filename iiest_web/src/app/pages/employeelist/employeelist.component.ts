import { Component, OnInit } from '@angular/core';
import { GetdataService } from 'src/app/services/getdata.service';
import { faEye, faPencil, faTrash, faEnvelope, faXmark, faCheck, faFileCsv, faFilePdf, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {
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
  constructor(private getDataService: GetdataService){}

  ngOnInit(): void {
    this.fetchAllEmployees();
  }

  fetchAllEmployees(): void {
    this.getDataService.getEmployeeData().subscribe(res =>{
      this.allEmployees = res.employeesData;
      this.filter();
    })
  }

  filter(): void {
    console.log(this.searchQuery)
    if(!this.searchQuery){
      this.filteredEmployees = this.allEmployees;
    }else{
      if(this.selectedFilter === 'byName'){
        this.filteredEmployees = this.allEmployees.filter((emp: any) => emp.employee_name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }else if(this.selectedFilter === 'byEmail'){
        this.filteredEmployees = this.allEmployees.filter((emp: any) => emp.email.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }else if(this.selectedFilter === 'byEmpId'){
        this.filteredEmployees = this.allEmployees.filter((emp: any) => emp.employee_id.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }else if(this.selectedFilter === 'byContact'){
        this.filteredEmployees = this.allEmployees.filter((emp: any) => emp.contact_no.toString().includes(this.searchQuery.toString()))
      }
    }
  }

  onSearchChange(): void{
    this.isSearch = true;
    this.filter();
  }

  onTableDataChange(event: any){
    this.pageNumber = event;
    this.filter();
  }
}
