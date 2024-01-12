import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { GearboxInterface } from '../models/gearbox.interface';

@Injectable({
  providedIn: 'root'
})
export class GearboxService{
  constructor(private apiService: ApiService) {}

  /**
   * Get gearboxes list
   */
  getList(): Observable<Array<GearboxInterface>> {
    return this.apiService.get<Array<GearboxInterface>>('gearboxes');
  }
}
