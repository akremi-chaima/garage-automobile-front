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

  /**
   * @param file
   * @param vehicleId
   */
  save(file: File, vehicleId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.apiService.postFile('private/picture/' + vehicleId, formData);
  }
}
