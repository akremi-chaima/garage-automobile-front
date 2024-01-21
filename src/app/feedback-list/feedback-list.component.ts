import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../api-services/feedback.service';
import { FeedbacksPaginatorInterface } from '../models/feedbacks-paginator.interface';
import { Router } from '@angular/router';
import { ConstsHelper } from '../consts.helper';
import { ToastrService } from 'ngx-toastr';

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
  feedbacksNumber?: number;

  feedbacksPaginator: FeedbacksPaginatorInterface|null;
  stars: Array<number>;
  pages: Array<number>;
  currentPage: number;
  itemsPerPage: number;

  constructor(
    private feedbackService: FeedbackService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.stars = [5, 4, 3, 2, 1];
    this.feedbacksPaginator = null;
    this.pages = [];
    this.currentPage = 1;
    this.itemsPerPage = this.feedbacksNumber ? this.feedbacksNumber : 10;
    this.getFeedbacks(this.currentPage);
  }

  getFeedbacks(pageNumber: number) {
    if ((pageNumber > 0 && pageNumber <= this.pages.length && pageNumber !== this.currentPage) || this.pages.length == 0) {
      this.currentPage = pageNumber;
      this.feedbackService.publicList(this.currentPage, this.itemsPerPage).subscribe(
        response => {
          this.feedbacksPaginator = response;
          this.pages = [];
          let pagesNumber = this.feedbacksPaginator.totalItems / 10;
          if (this.feedbacksPaginator.totalItems % 10 > 0) {
            pagesNumber++;
          }
          for (let i = 1; i <= pagesNumber; i++) {
            this.pages.push(i);
          }
        }, error => {
          this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
        }
      );
    }
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }
}
