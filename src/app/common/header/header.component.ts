import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { LocalStorageService} from '../../api-services/local-storage.service';
import { ConstsHelper } from '../../consts.helper';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CommonModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isPublic: boolean;
  isVisible: boolean;
  isAdministrator: boolean;

  constructor(
    public router: Router,
    public localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    this.isAdministrator = false;
    // https://upmostly.com/angular/subscribing-to-router-events-in-angular
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      // display administration or visitor menu by listening to route
      if (this.localStorageService.getToken() && this.localStorageService.getToken().role === ConstsHelper.ROLE_ADMINISTRATOR) {
        this.isAdministrator = true;
      } else {
        this.isAdministrator = false;
      }
      // hide menu content in login page
      this.isVisible = !event.url.includes('login') && !event.url.includes('reset/password');
      /**
       * display visitor or administration by route
       * if route contains administration display administrator menu
       * if route does not contains administration display visitor menu
       */
      this.isPublic = !event.url.includes('administration');
    });

  }

  navigateTo(page: string) {
    // simulate click to close mobile menu
    document.getElementById('menuCheckbox').click();
    this.router.navigate([page]);
  }

  logout() {
    localStorage.removeItem('token');
    this.navigateTo('administration/login');
  }
}
