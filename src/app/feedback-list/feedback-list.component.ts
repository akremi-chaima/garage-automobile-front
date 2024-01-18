import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
    imports: [
      HeaderComponent
    ],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.css'
})
export class FeedbackListComponent {

}
