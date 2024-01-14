import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ServiceService} from '../api-services/service.service';
import { ServiceInterface } from '../models/service.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-services',
  standalone: true,
    imports: [
      HeaderComponent,
      CommonModule
    ],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css'
})
export class OurServicesComponent implements OnInit {

  services: Array<ServiceInterface>
  constructor(private serviceService: ServiceService) {
  }

  ngOnInit() {
    this.services = [];
    this.serviceService.getList().subscribe(
      response => {
        this.services = response;
      }
    );
  }
}
