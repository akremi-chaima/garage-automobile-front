import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { UserInterface } from '../models/user.interface';
import { HandleUserInterface } from '../models/handle-user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) {}

  /**
   * Get users list
   */
  getList(): Observable<Array<UserInterface>> {
    return this.apiService.get<Array<UserInterface>>('private/users');
  }

  /**
   * Create user
   * @param user
   */
  create(user: HandleUserInterface): Observable<any> {
    return this.apiService.post<any>('private/user', user);
  }
}
