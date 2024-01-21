import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../api-services/vehicle.service';
import { VehiclesPaginatorInterface } from '../../models/vehicles-paginator.interface';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent implements OnInit{

  environment = environment;
  vehiclesPaginator: VehiclesPaginatorInterface|null;

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
  ) {
  }
  ngOnInit() {
    this.vehiclesPaginator = null;
    this.vehicleService.getList(1, 10).subscribe(
      response => {
        this.vehiclesPaginator = response;
      }
    );
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
