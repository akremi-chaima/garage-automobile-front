import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { VehiclesPaginatorInterface } from '../models/vehicles-paginator.interface';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private apiService: ApiService) {}

  /**
   * Get vehicles list
   * @param page
   * @param itemsPerPage
   */
  getList(page: number, itemsPerPage: number): Observable<VehiclesPaginatorInterface> {
    return this.apiService.post<VehiclesPaginatorInterface>('vehicles/' + page + '/' + itemsPerPage, {});
  }
}
