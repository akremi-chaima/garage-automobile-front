import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbacksPaginatorInterface } from '../../models/feedbacks-paginator.interface';
import { FeedbackService } from '../../api-services/feedback.service';
import { ToastrService } from 'ngx-toastr';
import { ConstsHelper } from '../../consts.helper';
import { Router } from '@angular/router';
import { FeedbackStatusInterface } from '../../models/feedback-status.interface';
import { FeedbackInterface } from '../../models/feedback.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.css'
})
export class FeedbacksComponent implements OnInit {

  @Input()
  maxFeedbacksNumber?: number;

  @Input()
  isPublic: boolean;

  feedbacksPaginator: FeedbacksPaginatorInterface|null;
  feedbackStatusList: Array<FeedbackStatusInterface>;
  stars: Array<number>;
  pages: Array<number>;
  currentPage: number;
  itemsPerPage: number;
  selectedFeedback: FeedbackInterface|null;
  form: FormGroup;
  control: FormControl;
  formSubmitted: boolean;
  displayModal: boolean;

  constructor(
    private feedbackService: FeedbackService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.stars = [5, 4, 3, 2, 1];
    this.displayModal = false;
    this.feedbacksPaginator = null;
    this.selectedFeedback = null;
    this.feedbackStatusList = [];
    this.pages = [];
    this.currentPage = 1;
    this.itemsPerPage = this.maxFeedbacksNumber ? this.maxFeedbacksNumber : 10;
    this.getFeedbacks(this.currentPage);
    this.feedbackService.getStatusList().subscribe(
      response => {
        this.feedbackStatusList = response;
      }
    );
  }

  getFeedbacks(pageNumber: number, forceToReload: boolean = false) {
    if ((pageNumber > 0 && pageNumber <= this.pages.length && pageNumber !== this.currentPage) || this.pages.length == 0 || forceToReload) {
      this.currentPage = pageNumber;
      this.feedbackService.list(this.currentPage, this.itemsPerPage, this.isPublic).subscribe(
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
          if (error.status === 401) {
            // delete token from local storage and redirect to login page
            this.router.navigate(['administration/login']);
            localStorage.removeItem('token');
          } else {
            // Error to call API
            this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
          }
        }
      );
    }
  }

  initForm(selectedFeedback: FeedbackInterface) {
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('id', this.formBuilder.control(selectedFeedback.id, [Validators.required]));
    this.form.addControl('status', this.formBuilder.control(selectedFeedback.status.code, [Validators.required]));
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }

  showModal(display: boolean, selectedFeedback: FeedbackInterface|null = null) {
    this.displayModal = display;
    this.selectedFeedback = selectedFeedback;
    if (display) {
      this.initForm(selectedFeedback);
    }
  }

  save() {
    if (this.form.valid) {
      this.feedbackService.updateStatus(parseInt(this.form.get('id').value), this.form.get('status').value).subscribe(
        response => {
          this.showModal(false);
          this.getFeedbacks(this.currentPage, true);
          this.toastr.success('Le statut a été modifié avec succès.', null, {positionClass: 'toast-top-center'});
        }, error => {
          if (error.status === 401) {
            // delete token from local storage and redirect to login page
            this.router.navigate(['administration/login']);
            localStorage.removeItem('token');
          } else {
            // Error to call API
            this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
          }
        }
      );
    }
  }
}
