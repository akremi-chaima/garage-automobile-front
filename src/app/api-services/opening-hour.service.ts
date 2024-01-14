import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { OpeningHourInterface } from '../models/opening-hour.interface';
import { HandleOpeningHourInterface } from '../models/handle-opening-hour.interface';

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

  /**
   * Get opening hour by id
   * @param openingHourId
   */
  get(openingHourId: number): Observable<OpeningHourInterface> {
    return this.apiService.get<OpeningHourInterface>('private/opening/hour/' + openingHourId);
  }

  /**
   * Create opening hour
   * @param openingHour
   */
  create(openingHour: HandleOpeningHourInterface): Observable<any> {
    return this.apiService.post<any>('private/opening/hour', openingHour);
  }

  /**
   * Update opening hour
   * @param openingHour
   */
  update(openingHour: HandleOpeningHourInterface): Observable<any> {
    return this.apiService.put<any>('private/opening/hour', openingHour);
  }


  /**
   * Delete opening hour
   * @param id
   */
  delete(id: number): Observable<any> {
    return this.apiService.delete<any>('private/opening/hour/' + id);
  }
}
