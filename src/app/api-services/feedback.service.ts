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
   * @param isPublic
   */
  add(object: CreateFeedbackInterface, isPublic: boolean): Observable<any> {
    let url = 'feedback';
    if (!isPublic) {
      url = 'private/feedback';
    }
    return this.apiService.post<any>(url, object);
  }

  /**
   * Get feedbacks for visitors
   * @param page
   * @param itemsPerPage
   * @param isPublic
   */
  list(page: number, itemsPerPage: number, isPublic: boolean): Observable<FeedbacksPaginatorInterface> {
    let url = 'feedbacks/' + page + '/' + itemsPerPage;
    if (!isPublic) {
      url = 'private/feedbacks/' + page + '/' + itemsPerPage;
    }
    return this.apiService.get<FeedbacksPaginatorInterface>(url);
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
