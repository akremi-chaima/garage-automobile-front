import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { VehiclesComponent } from '../../common/vehicles/vehicles.component';
import { FeedbacksComponent } from '../../common/feedbacks/feedbacks.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    VehiclesComponent,
    FeedbacksComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
