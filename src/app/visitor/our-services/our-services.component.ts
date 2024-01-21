import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { ServiceService} from '../../api-services/service.service';
import { ServiceInterface } from '../../models/service.interface';
import { CommonModule } from '@angular/common';
import { HeaderCarouselComponent } from '../../common/header-carousel/header-carousel.component';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    HeaderCarouselComponent
  ],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css'
})
export class OurServicesComponent implements OnInit {

  services: Array<ServiceInterface>;
  pictures: Array<string>;
  constructor(private serviceService: ServiceService) {
  }

  ngOnInit() {
    this.pictures = [
      './assets/images/diagnostic.jpeg',
      './assets/images/lavage.jpeg',
      './assets/images/vidange.jpeg',
      './assets/images/technical-control.jpeg'
    ]
    this.services = [];
    this.serviceService.getList().subscribe(
      response => {
        for (let service of response) {
          if (service.isActive) {
            this.services.push(service);
          }
        }
      }
    );
  }
}
