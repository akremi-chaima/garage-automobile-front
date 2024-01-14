import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ServiceInterface } from '../models/service.interface';

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
}
