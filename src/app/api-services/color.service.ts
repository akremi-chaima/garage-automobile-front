import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ColorInterface } from '../models/color.interface';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  constructor(private apiService: ApiService) {}

  /**
   * Get colors list
   */
  getList(): Observable<Array<ColorInterface>> {
    return this.apiService.get<Array<ColorInterface>>('colors');
  }
}
