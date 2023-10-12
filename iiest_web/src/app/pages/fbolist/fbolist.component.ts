import { Component, OnInit } from '@angular/core';
import { GetdataService } from 'src/app/services/getdata.service';
import { faEye, faPencil, faTrash, faEnvelope, faXmark} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fbolist',
  templateUrl: './fbolist.component.html',
  styleUrls: ['./fbolist.component.scss']
})
export class FbolistComponent implements OnInit {
  allFBOEntries: any;
  faEye = faEye;
  faPencil = faPencil;
  faTrash = faTrash;
  faEnvelope = faEnvelope;
  faXmark = faXmark;
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
