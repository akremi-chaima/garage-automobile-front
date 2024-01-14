import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OpeningHourInterface } from '../models/opening-hour.interface';
import { OpeningHourService } from '../api-services/opening-hour.service';
import { ConstsHelper } from '../consts.helper';

@Component({
  selector: 'app-opening-hours-list',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule
  ],
  templateUrl: './opening-hours-list.component.html',
  styleUrl: './opening-hours-list.component.css'
})
export class OpeningHoursListComponent implements OnInit {

  openingHours: Array<OpeningHourInterface>;

  constructor(
    private openingHourService: OpeningHourService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.openingHours = [];
    this.openingHourService.getList().subscribe(
      response => {
        this.openingHours = response;
      }, error => {
        this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
      }
    );
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }
}
