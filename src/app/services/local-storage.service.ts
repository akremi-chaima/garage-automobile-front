import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginResponseInterface } from '../models/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements CanActivate {

  constructor(private router: Router) {}
  save(data: LoginResponseInterface): void {
    localStorage.setItem('token', JSON.stringify(data));
    this.router.navigate(['/vehicles']);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkToken();
  }

  /**
   * Get token information
   */
  getToken(): LoginResponseInterface {
    if (localStorage.getItem('token')) {
      return JSON.parse(localStorage.getItem('token'));
    }
    return null;
  }


  /**
   * Check token expiration
   */
  private checkToken() {
    if (this.getToken() != null) {
      const today = new Date();
      const day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
      // check token expiration
      if (parseInt(this.getToken().expiration, 10) >= parseInt(today.getUTCFullYear() + '' + (today.getMonth() + 1 ) + '' + day, 10)) {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }

}
