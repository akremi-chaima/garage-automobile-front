import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { ServiceInterface } from '../models/service.interface';
import { ServiceService } from '../api-services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-list',
  standalone: true,
    imports: [
      HeaderComponent,
      CommonModule
    ],
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.css'
})
export class ServicesListComponent implements OnInit {

  services: Array<ServiceInterface>;

  constructor(
    private serviceService: ServiceService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.services = [];
    this.serviceService.getList().subscribe(
      response => {
        this.services = response;
      }
    );
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }
}
