import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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

  constructor(
    public router: Router,
  ) {
  }

  ngOnInit() {
    this.isPublic = !window.location.href.includes('administration');
  }
}
