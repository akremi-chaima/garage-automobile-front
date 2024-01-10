import { Component } from '@angular/core';
import { PublicHeaderComponent } from '../public-header/public-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PublicHeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
