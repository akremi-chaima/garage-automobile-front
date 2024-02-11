import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FeedbacksComponent } from '../../common/feedbacks/feedbacks.component';
import { HeaderCarouselComponent } from '../../common/header-carousel/header-carousel.component';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
    imports: [
        CommonModule,
        FeedbacksComponent,
        HeaderCarouselComponent
    ],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.css'
})
export class FeedbackListComponent {

  pictures = [
    './assets/images/feedbacks/1.png',
    './assets/images/feedbacks/2.png',
    './assets/images/feedbacks/3.png',
  ]
  constructor(private router: Router) {
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }
}
