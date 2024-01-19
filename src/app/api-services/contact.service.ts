import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ContactInterface } from '../models/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private apiService: ApiService) {}

  /**
   * Send contact message
   * @param object
   */
  sendMessage(object: ContactInterface): Observable<any> {
    return this.apiService.post<any>('contact', object);
  }
}
