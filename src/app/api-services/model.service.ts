import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ModelInterface } from '../models/model.interface';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  constructor(private apiService: ApiService) {}

  /**
   * Get models list
   */
  getList(): Observable<Array<ModelInterface>> {
    return this.apiService.get<Array<ModelInterface>>('models');
  }
}
