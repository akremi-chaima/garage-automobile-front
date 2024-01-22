import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { FeedbacksPaginatorInterface } from '../models/feedbacks-paginator.interface';
import { CreateFeedbackInterface } from '../models/create-feedback.interface';
import { FeedbackStatusInterface } from '../models/feedback-status.interface';

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

  /**
   * Get feedbacks status list
   */
  getStatusList(): Observable<Array<FeedbackStatusInterface>> {
    return this.apiService.get<Array<FeedbackStatusInterface>>('private/status/feedbacks/list');
  }

  /**
   * Update feedback status
   * @param id
   * @param statusCode
   */
  updateStatus(id: number, statusCode: string): Observable<any> {
    return this.apiService.put<any>('private/feedback/status', {id, statusCode});
  }
}
