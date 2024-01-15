import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { OpeningHourService } from '../api-services/opening-hour.service';
import { OpeningHourInterface } from '../models/opening-hour.interface';
import { HeaderCarouselComponent } from '../header-carousel/header-carousel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeaderCarouselComponent
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit{

  openingHours: Array<OpeningHourInterface>;
  pictures: Array<string>;

  constructor(
    private openingHourService: OpeningHourService
  ) {
  }

  ngOnInit() {
    this.openingHours = [];
    this.pictures = [
      './assets/images/contact-us-1.jpeg'
    ];
    this.openingHourService.getList().subscribe(
      response => {
        this.openingHours = response;
      }
    );
  }

  formattingOpeningHours(startHour: string|null, endHour: string|null) {
    let text = '';
    if (startHour) {
      text += startHour;
    }
    if (endHour) {
      text += ' - ' + endHour;
    }

    return text;
  }
}
