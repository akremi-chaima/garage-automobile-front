import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FeedbackInterface } from '../models/feedback.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
    imports: [
      HeaderComponent,
      CommonModule
    ],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.css'
})
export class FeedbackListComponent implements OnInit {

  @Input()
  feedbackNumber?: number;

  feedbacks: Array<FeedbackInterface>;
  stars: Array<number>;

  ngOnInit() {
    this.stars = [5, 4, 3, 2, 1];
    this.feedbacks = [
      {
        lastName: 'Luna John',
        firstName: 'Marketer',
        createdAt: '01/12/2023',
        message: 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l\'imprimerie depuis les années 1500',
        stars: 3,
      },
      {
        lastName: 'Luna John',
        firstName: 'Marketer',
        createdAt: '01/12/2023',
        message: 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l\'imprimerie depuis les années 1500',
        stars: 2,
      },
      {
        lastName: 'Luna John',
        firstName: 'Marketer',
        createdAt: '01/12/2023',
        message: 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l\'imprimerie depuis les années 1500',
        stars: 1,
      },
      {
        lastName: 'Luna John',
        firstName: 'Marketer',
        createdAt: '01/12/2023',
        message: 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l\'imprimerie depuis les années 1500',
        stars: 5,
      }
    ];
  }
}
