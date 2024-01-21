import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { FeedbackInterface } from '../models/feedback.interface';
import { FeedbacksPaginatorInterface } from '../models/feedbacks-paginator.interface';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private apiService: ApiService) {}

  /**
   * Create feedback
   * @param object
   */
  add(object: FeedbackInterface): Observable<any> {
    return this.apiService.post<any>('feedback', object);
  }

  /**
   * Get feedbacks
   * @param page
   * @param itemsPerPage
   */
  get(page: number, itemsPerPage: number): Observable<FeedbacksPaginatorInterface> {
    return this.apiService.get<FeedbacksPaginatorInterface>('feedbacks/' + page + '/' + itemsPerPage);
  }
}
