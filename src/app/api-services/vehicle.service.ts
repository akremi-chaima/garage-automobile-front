import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { VehiclesPaginatorInterface } from '../models/vehicles-paginator.interface';
import { HandleVehicleInterface } from '../models/handle-vehicle.interface';
import { VehicleInterface } from '../models/vehicle.interface';
import { VehicleFilterInterface } from '../models/vehicle-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private apiService: ApiService) {}

  /**
   * Get vehicles list
   * @param page
   * @param itemsPerPage
   * @param filter
   */
  getList(page: number, itemsPerPage: number, filter: VehicleFilterInterface|null): Observable<VehiclesPaginatorInterface> {
    let body = {};
    if (filter) {
      body = filter;
    }
    return this.apiService.post<VehiclesPaginatorInterface>('vehicles/' + page + '/' + itemsPerPage, body);
  }

  /**
   * Get vehicle
   * @param id
   */
  get(id: number): Observable<VehicleInterface> {
    return this.apiService.get<VehicleInterface>('vehicles/' + id);
  }

  /**
   * Create vehicle
   * @param vehicle
   */
  create(vehicle: HandleVehicleInterface): Observable<any> {
    return this.apiService.post<any>('private/vehicle', vehicle);
  }

  /**
   * Update vehicle
   * @param vehicle
   */
  update(vehicle: HandleVehicleInterface): Observable<any> {
    return this.apiService.put<any>('private/vehicle', vehicle);
  }

  /**
   * Delete vehicle
   * @param id
   */
  delete(id: number): Observable<any> {
    return this.apiService.delete<any>('private/vehicle/' + id);
  }
}
