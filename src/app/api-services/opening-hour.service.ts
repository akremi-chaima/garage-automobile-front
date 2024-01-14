import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { OpeningHourInterface } from '../models/opening-hour.interface';

@Injectable({
  providedIn: 'root'
})
export class OpeningHourService {
  constructor(private apiService: ApiService) {}

  /**
   * Get opening hours list
   */
  getList(): Observable<Array<OpeningHourInterface>> {
    return this.apiService.get<Array<OpeningHourInterface>>('opening/hours');
  }
}
