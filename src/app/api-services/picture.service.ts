import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  constructor(private apiService: ApiService) {}

  /**
   * Delete picture
   */
  delete(pictureId: number): Observable<any> {
    return this.apiService.delete<any>('private/picture/' + pictureId);
  }
}
