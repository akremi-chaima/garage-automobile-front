import { Component } from '@angular/core';
import { FeedbackFormComponent } from '../../common/feedback-form/feedback-form.component';

@Component({
  selector: 'app-add-feedback',
  standalone: true,
  imports: [
    FeedbackFormComponent
  ],
  templateUrl: './add-feedback.component.html',
  styleUrl: './add-feedback.component.css'
})
export class AddFeedbackComponent {

}
