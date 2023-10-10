import { Component, OnInit } from '@angular/core';
import { GetdataService } from 'src/app/services/getdata.service';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {
  allEmployees: any
  constructor(private getDataService: GetdataService){}

  ngOnInit(): void {
    this.getDataService.getEmployeeData().subscribe(res =>{
      this.allEmployees = Object.values(res);
    })
  }
}
