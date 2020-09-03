import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from '../services/data-storage.service';
import { CoreService } from '../services/core.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() deliveryData: any
  showLoader: boolean = false;
  valForm: FormGroup;
  drivers: Array<any> = [{ label: 'Please Select', value: '' }];
  constructor(
    fb: FormBuilder,
    public ds: DataStorageService,
    public service: CoreService,
    private messageService: MessageService,
  ) {
    this.drivers = [{ label: 'Please Select', value: '' }];;
    this.valForm = fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      fromLocation: new FormControl('', [Validators.required]),
      toLocation: new FormControl('', [Validators.required]),
      driver: new FormControl('', [Validators.required]),
    });

    this.getDrivers()
  }

  ngOnInit(): void {
    console.log('form module initialised');

  }

  public async onSubmit() {
    console.log('form', this.valForm.value);
    this.showLoader = true;
    this.service.createDeliveryRequest(this.valForm.value).subscribe((resp: any) => {
      this.showLoader = false;
      if (resp.status === 200) {
        this.messageService.add({
          severity: 'success',
          summary: 'Create delivery',
          detail: resp.message
        });
      }
    }, err => {
      this.messageService.add({
        severity: 'error',
        summary: 'Create delivery',
        detail: 'internal server error'
      });
      console.log('create error: ', err);

    })
  }

  public async getDrivers() {
    await this.setDrivers();
    if (this.drivers.length === 0) {
      this.showLoader = true;
      this.service.Drivers().subscribe(async (resp: any) => {
        this.showLoader = false;
        this.ds.setDrivers(resp.data)
        await this.setDrivers();
      }, err => {
        console.log('load driver error: ', err);
      })
    }
  }


  private async setDrivers() {
    let temp: Array<any> = [];
    let allData = await this.ds.getDrivers();
    this.drivers = allData.filter((e: any) => e.availability)
    for (const iterator of this.drivers) {
      temp.push({ label: iterator.name, value: iterator._id });
    }
    this.drivers = temp;
  }
}
