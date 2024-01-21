import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { FeedbacksPaginatorInterface } from '../models/feedbacks-paginator.interface';
import { CreateFeedbackInterface } from '../models/create-feedback.interface';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private apiService: ApiService) {}

  /**
   * Create feedback
   * @param object
   */
  add(object: CreateFeedbackInterface): Observable<any> {
    return this.apiService.post<any>('feedback', object);
  }

  /**
   * Get feedbacks for visitors
   * @param page
   * @param itemsPerPage
   */
  publicList(page: number, itemsPerPage: number): Observable<FeedbacksPaginatorInterface> {
    return this.apiService.get<FeedbacksPaginatorInterface>('feedbacks/' + page + '/' + itemsPerPage);
  }

  /**
   * Get feedbacks for employee
   * @param page
   * @param itemsPerPage
   */
  privateList(page: number, itemsPerPage: number): Observable<FeedbacksPaginatorInterface> {
    return this.apiService.get<FeedbacksPaginatorInterface>('private/feedbacks/' + page + '/' + itemsPerPage);
  }
}
