import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { VehiclesComponent } from '../vehicles/vehicles.component';
import { FeedbackListComponent } from '../feedback-list/feedback-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    VehiclesComponent,
    FeedbackListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
