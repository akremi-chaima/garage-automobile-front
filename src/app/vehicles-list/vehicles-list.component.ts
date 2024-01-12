import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { VehicleService } from '../api-services/vehicle.service';
import { VehiclesPaginatorInterface } from '../models/vehicles-paginator.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicles-list',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule
  ],
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.css'
})
export class VehiclesListComponent implements OnInit {

  vehiclesPaginator: VehiclesPaginatorInterface|null;

  constructor(
    private vehicleService: VehicleService
  ) {
  }

  ngOnInit() {
    this.vehiclesPaginator = null;
    this.getVehicles(1);
  }

  getVehicles(page: number) {
    this.vehicleService.getList(page, 10).subscribe(
      response => {
        this.vehiclesPaginator = response;
        console.log(this.vehiclesPaginator.data)
      }
    );
  }
}
