import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { EnergyInterface } from '../models/energy.interface';

@Injectable({
  providedIn: 'root'
})
export class EnergyService {
  constructor(private apiService: ApiService) {}

  /**
   * Get energies list
   */
  getList(): Observable<Array<EnergyInterface>> {
    return this.apiService.get<Array<EnergyInterface>>('energies');
  }
}
