import { Component, OnInit } from '@angular/core';
import { HeaderCarouselComponent } from '../../common/header-carousel/header-carousel.component';
import { FeedbackFormComponent } from '../../common/feedback-form/feedback-form.component';

@Component({
  selector: 'app-create-feedback',
  standalone: true,
  imports: [
    HeaderCarouselComponent,
    FeedbackFormComponent
  ],
  templateUrl: './create-feedback.component.html',
  styleUrl: './create-feedback.component.css'
})
export class CreateFeedbackComponent implements OnInit {

  pictures: Array<string>;

  ngOnInit() {
    this.pictures = [
      './assets/images/feedbacks/1.png',
      './assets/images/feedbacks/2.png',
      './assets/images/feedbacks/3.png',
    ];
  }
}
