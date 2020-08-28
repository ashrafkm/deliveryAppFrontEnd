import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table'
import { CoreService } from '../services/core.service';


export interface PeriodicElement {
  name: string;
  description: any;
  fromLocation: string;
  toLocation: string;
  driver: string;
  status: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', description: 1.0079, fromLocation: 'a', toLocation: 'b', driver: 'x', status: 'NA' },
  { name: 'Helium', description: 4.0026, fromLocation: 'a', toLocation: 'b', driver: 'x', status: 'NA' },
  { name: 'Lithium', description: 6.941, fromLocation: 'a', toLocation: 'b', driver: 'x', status: 'NA' },
  { name: 'Beryllium', description: 9.0122, fromLocation: 'a', toLocation: 'b', driver: 'x', status: 'NA' },
  { name: 'Boron', description: 10.811, fromLocation: 'a', toLocation: 'b', driver: 'x', status: 'NA' },
  { name: 'Carbon', description: 12.0107, fromLocation: 'a', toLocation: 'b', driver: 'x', status: 'NA' },
  { name: 'Nitrogen', description: 14.0067, fromLocation: 'a', toLocation: 'b', driver: 'x', status: 'NA' },
  { name: 'Oxygen', description: 15.9994, fromLocation: 'a', toLocation: 'b', driver: 'x', status: 'NA' },
  { name: 'Fluorine', description: 18.9984, fromLocation: 'a', toLocation: 'b', driver: 'x', status: 'NA' },
  { name: 'Neon', description: 20.1797, fromLocation: 'a', toLocation: 'b', driver: 'x', status: 'NA' },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'fromLocation', 'toLocation', 'driver', 'status'];
  dataSource: any;
  showLoader: boolean = false;
  constructor(
    public service: CoreService
  ) {
    this.loadDeliveries()
  }

  ngOnInit(): void {
  }

  public async loadDeliveries() {
    this.showLoader = true
    this.service.getlistOfDeliveries().subscribe((resp: any) => {
      this.showLoader = false
      this.dataSource = resp.data;
    }, err => {
      console.log('list error: ', err);

    })
  }

}
