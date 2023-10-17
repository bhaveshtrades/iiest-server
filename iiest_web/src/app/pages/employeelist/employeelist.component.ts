import { Component, OnInit } from '@angular/core';
import { GetdataService } from 'src/app/services/getdata.service';
import { faEye, faPencil, faTrash, faEnvelope, faXmark, faCheck, faFileCsv, faFilePdf, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { RegisterService } from 'src/app/services/register.service';

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
  
  constructor(private getDataService: GetdataService, private registerService: RegisterService) {}

  ngOnInit(): void {
    this.fetchAllEmployees();
  }

  fetchAllEmployees(): void {
    this.getDataService.getEmployeeData().subscribe(res => {
      this.allEmployees = res.employeesData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((emp: any, index: number) => ({ ...emp, serialNumber: index + 1 }));
      this.allEmployees.map((item:any, index:number) => {
       delete(item.password);
      //  delete(item.id_num);
      //  delete(item._id);
       delete(item.__v)
       console.log(item.state);
      });
      console.log(this.allEmployees[62].createdAt)
      this.filter();
    })
  }

  filter(): void {
    console.log(this.searchQuery)
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

  deleteEmployee(employee: any): void {
    this.registerService.deleteEmployee(employee._id).subscribe(
      res => {
        if (res.success) {
          const index = this.allEmployees.findIndex((entry: any) => entry._id === employee._id);
          if (index !== -1) {
            this.allEmployees.splice(index, 1);
            this.filter();
          }
        } else {
          console.error(res.message);
        }
      }
    );
  }
  //Export To CSV
  exportToCsv() {
    new ngxCsv(this.allEmployees, 'Report', this.options)
  }
}
