import { Component, OnInit } from '@angular/core';
import { OpeningHourService } from '../../api-services/opening-hour.service';
import { OpeningHourInterface } from '../../models/opening-hour.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  openingHours: Array<OpeningHourInterface>;

  constructor(
    private openingHourService: OpeningHourService,
  ) {
  }

  ngOnInit() {
    this.openingHours = [];
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
