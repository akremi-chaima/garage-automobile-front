import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { OptionInterface } from '../models/option.interface';

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  constructor(private apiService: ApiService) {}

  /**
   * Get options list
   */
  getList(): Observable<Array<OptionInterface>> {
    return this.apiService.get<Array<OptionInterface>>('options');
  }
}
