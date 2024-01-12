import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { VehicleService } from '../api-services/vehicle.service';
import { VehiclesPaginatorInterface } from '../models/vehicles-paginator.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  pages: Array<number>;
  currentPage: number;

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.vehiclesPaginator = null;
    this.pages = [];
    this.currentPage = 1;
    this.getVehicles(this.currentPage);
  }

  getVehicles(pageNumber: number) {
    if ((pageNumber > 0 && pageNumber <= this.pages.length && pageNumber !== this.currentPage) || this.pages.length == 0) {
      this.currentPage = pageNumber;
      this.vehicleService.getList(this.currentPage, 10).subscribe(
        response => {
          this.vehiclesPaginator = response;
          this.pages = [];
          let pagesNumber = this.vehiclesPaginator.totalItems / 10;
          if (this.vehiclesPaginator.totalItems % 10 > 0) {
            pagesNumber++;
          }
          for (let i = 1; i <= pagesNumber; i++) {
            this.pages.push(i);
          }
        }
      );
    }
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }
}
