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
   * Get user by id
   * @param userId
   */
  get(userId: number): Observable<UserInterface> {
    return this.apiService.get<UserInterface>('private/user/' + userId);
  }

  /**
   * Create user
   * @param user
   */
  create(user: HandleUserInterface): Observable<any> {
    return this.apiService.post<any>('private/user', user);
  }

  /**
   * Update user
   * @param user
   */
  update(user: HandleUserInterface): Observable<any> {
    return this.apiService.put<any>('private/user', user);
  }

  /**
   * Delete user by id
   * @param userId
   */
  delete(userId: number): Observable<any> {
    return this.apiService.delete<any>('private/user/' + userId);
  }

  /**
   * Update user password
   * @param data
   */
  updatePassword(data: object): Observable<any> {
    return this.apiService.put<any>('private/update/password', data);
  }
}
