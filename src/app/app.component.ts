import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from './services/core.service';
import { DataStorageService } from './services/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'deliveryApp';
  constructor(
    private router: Router,
    public service: CoreService,
    public ds: DataStorageService,
  ) {
    this.loadDrivers()
  }
  home() {
    this.router.navigate(['home']);
  }
  drivers() {
    this.router.navigate(['drivers']);
  }
  formOpen() {
    console.log('clicked button');

    this.router.navigate(['form']);
  }
  async loadDrivers() {
    this.service.Drivers().subscribe((resp: any) => {
      this.ds.setDrivers(resp.data)
    }, err => {
      console.log('load driver error: ', err);

    })
  }
}
