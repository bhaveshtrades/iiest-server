import { Component, OnInit } from '@angular/core';
import { GetdataService } from 'src/app/services/getdata.service';
import { faEye, faPencil, faTrash, faEnvelope, faXmark, faMagnifyingGlass, faFileCsv, faFilePdf} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fbolist',
  templateUrl: './fbolist.component.html',
  styleUrls: ['./fbolist.component.scss']
})
export class FbolistComponent implements OnInit {
  createdBy: any;
  allFBOEntries: any;
  selectedFilter: string = 'byOwner';
  searchQuery: string = '';
  filteredData: any;
  isSearch: boolean = false;
  faEye = faEye;
  faPencil = faPencil;
  faTrash = faTrash;
  faEnvelope = faEnvelope;
  faXmark = faXmark;
  faFileCsv = faFileCsv;
  faFilePdf = faFilePdf;
  faMagnifyingGlass = faMagnifyingGlass;
  pageNumber: number = 1;
  constructor(private getDataService: GetdataService){}

  ngOnInit(): void {
    this.fetchAllFboData();
  }

  fetchAllFboData(): void {
    this.getDataService.getAllFboData().subscribe(res =>{
      this.allFBOEntries = res.fboData.map((elem: any, index: number)=> ({...elem, serialNumber: index + 1}));
      console.log(this.allFBOEntries);
      this.filter();
    })
  }

  filter(): void {
    console.log(this.searchQuery)
    if(!this.searchQuery){
      this.filteredData = this.allFBOEntries;
    }else{
      if(this.selectedFilter === 'byOwner'){
        this.filteredData = this.allFBOEntries.filter((elem: any) => elem.owner_name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }else if(this.selectedFilter === 'byEmail'){
        this.filteredData = this.allFBOEntries.filter((elem: any) => elem.email.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }else if(this.selectedFilter === 'byName'){
        this.filteredData = this.allFBOEntries.filter((elem: any) => elem.fbo_name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }else if(this.selectedFilter === 'byContact'){
        this.filteredData = this.allFBOEntries.filter((elem: any) => elem.owner_contact.toString().includes(this.searchQuery.toString()))
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
