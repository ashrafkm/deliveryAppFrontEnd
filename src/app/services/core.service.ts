import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  createDeliveryRequest(data: any,) {
    return this.http.post(`${environment.apiURL}delivery-request/create`, data);
  }

  getlistOfDeliveries() {
    return this.http.get(`${environment.apiURL}delivery-request/list`);
  }
  Drivers() {
    return this.http.get(`${environment.apiURL}drivers/list`);
  }
  updateDriver(id: string, doc: any) {
    return this.http.put(`${environment.apiURL}drivers/update/${id}`, doc);
  }
}
