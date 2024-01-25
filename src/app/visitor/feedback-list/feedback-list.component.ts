import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FeedbacksComponent } from '../../common/feedbacks/feedbacks.component';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [
    CommonModule,
    FeedbacksComponent
  ],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.css'
})
export class FeedbackListComponent {

  constructor(private router: Router) {
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }
}
