import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ServiceInterface } from '../models/service.interface';
import { HandleServiceInterface } from '../models/handle-service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private apiService: ApiService) {}

  /**
   * Get services list
   */
  getList(): Observable<Array<ServiceInterface>> {
    return this.apiService.get<Array<ServiceInterface>>('services');
  }

  /**
   * Get service by id
   * @param serviceId
   */
  get(serviceId: number): Observable<ServiceInterface> {
    return this.apiService.get<ServiceInterface>('private/services/' + serviceId);
  }

  /**
   * Create service
   * @param service
   */
  create(service: HandleServiceInterface): Observable<any> {
    return this.apiService.post<any>('private/service', service);
  }

  /**
   * Update service
   * @param service
   */
  update(service: HandleServiceInterface): Observable<any> {
    return this.apiService.put<any>('private/service', service);
  }


  /**
   * Delete service
   * @param id
   */
  delete(id: number): Observable<any> {
    return this.apiService.delete<any>('private/service/' + id);
  }
}
