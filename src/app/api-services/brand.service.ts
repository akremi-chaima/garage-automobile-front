import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { BrandInterface } from '../models/brand.interface';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private apiService: ApiService) {}

  /**
   * Get brands list
   */
  getList(): Observable<Array<BrandInterface>> {
    return this.apiService.get<Array<BrandInterface>>('brands');
  }
}
