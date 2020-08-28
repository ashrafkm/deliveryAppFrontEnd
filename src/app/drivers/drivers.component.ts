import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  drivers: Array<any> = []
  showLoader: boolean = false;
  constructor(
    public ds: DataStorageService,
    public service: CoreService,
  ) {
    this.getDrivers()
  }

  ngOnInit(): void {
  }

  public async getDrivers() {
    this.drivers = await this.ds.getDrivers();
    if (this.drivers.length === 0) {
      this.showLoader = true;
      this.service.Drivers().subscribe((resp: any) => {
        this.showLoader = false;
        this.ds.setDrivers(resp.data)
        this.drivers = resp.data
      }, err => {
        console.log('load driver error: ', err);

      })
    }
  }

  change(event, val: any) {
    console.log('val: ', val);
    this.service.updateDriver(val._id, val).subscribe((resp) => {
      console.log('resp: ', resp);

    }, err => {
      console.log('driver update err: ', err);

    })

  }
}
