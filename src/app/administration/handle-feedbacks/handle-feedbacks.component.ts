import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../api-services/feedback.service';
import { FeedbacksPaginatorInterface } from '../../models/feedbacks-paginator.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConstsHelper } from '../../consts.helper';

@Component({
  selector: 'app-handle-feedbacks',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './handle-feedbacks.component.html',
  styleUrl: './handle-feedbacks.component.css'
})
export class HandleFeedbacksComponent implements OnInit {

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
    this.itemsPerPage = 10;
    this.getFeedbacks(this.currentPage);
  }

  getFeedbacks(pageNumber: number) {
    if ((pageNumber > 0 && pageNumber <= this.pages.length && pageNumber !== this.currentPage) || this.pages.length == 0) {
      this.currentPage = pageNumber;
      this.feedbackService.privateList(this.currentPage, this.itemsPerPage).subscribe(
        response => {
          this.feedbacksPaginator = response;
          this.pages = [];
          let pagesNumber = this.feedbacksPaginator.totalItems / this.itemsPerPage;
          if (this.feedbacksPaginator.totalItems % this.itemsPerPage > 0) {
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
