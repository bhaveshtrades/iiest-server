import { Component, OnInit } from '@angular/core';
import { GetdataService } from 'src/app/services/getdata.service';

@Component({
  selector: 'app-fbolist',
  templateUrl: './fbolist.component.html',
  styleUrls: ['./fbolist.component.scss']
})
export class FbolistComponent implements OnInit {
  allFBOEntries: any;
  pageNumber: number = 1;
  constructor(private getDataService: GetdataService){}

  ngOnInit(): void {
    this.fetchAllFboData();
  }

  fetchAllFboData(): void {
    this.getDataService.getAllFboData().subscribe(res =>{
      this.allFBOEntries = Object.values(res);
    })
  }

  onTableDataChange(event: any){
    this.pageNumber = event;
    this.fetchAllFboData();
  }
}
