import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

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

  constructor(
    public router: Router,
  ) {
  }

  ngOnInit() {
    // display administration or visitor menu by listening to route
    // https://upmostly.com/angular/subscribing-to-router-events-in-angular
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      // hide menu content in login page
      this.isVisible = !event.url.includes('login');
      this.isPublic = !event.url.includes('administration');
    });

  }
}
