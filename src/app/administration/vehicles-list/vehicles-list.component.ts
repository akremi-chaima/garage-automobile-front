import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VehiclesComponent } from '../../common/vehicles/vehicles.component';

@Component({
  selector: 'app-vehicles-list',
  standalone: true,
    imports: [
      HeaderComponent,
      CommonModule,
      VehiclesComponent
    ],
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.css'
})
export class VehiclesListComponent {

  constructor(private router: Router) {}

  navigateTo(page: string) {
    this.router.navigate([page]);
  }
}
