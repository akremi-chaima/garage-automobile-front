import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { FeedbackInterface } from '../models/feedback.interface';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private apiService: ApiService) {}

  /**
   * Send contact message
   * @param object
   */
  add(object: FeedbackInterface): Observable<any> {
    return this.apiService.post<any>('feedback', object);
  }
}
