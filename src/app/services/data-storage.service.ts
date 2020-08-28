import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  drivers: Array<any> = [];
  constructor() { }

  public getDrivers(): Array<[]> {
    return this.drivers;
  }
  public setDrivers(data: Array<any>) {
    this.drivers = data;
  }
}
