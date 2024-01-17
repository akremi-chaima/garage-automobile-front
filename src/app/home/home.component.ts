import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { VehiclesComponent } from '../vehicles/vehicles.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    VehiclesComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
