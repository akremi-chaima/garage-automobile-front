import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbacksComponent } from "../../common/feedbacks/feedbacks.component";

@Component({
  selector: 'app-handle-feedbacks',
  standalone: true,
  imports: [
    CommonModule,
    FeedbacksComponent
  ],
  templateUrl: './handle-feedbacks.component.html',
  styleUrl: './handle-feedbacks.component.css'
})
export class HandleFeedbacksComponent {
}
