import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { CommonModule } from '@angular/common';
import { ServiceInterface } from '../../models/service.interface';
import { ServiceService } from '../../api-services/service.service';
import { Router } from '@angular/router';
import { ConstsHelper } from '../../consts.helper';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.services = [];
    this.serviceService.getList().subscribe(
      response => {
        this.services = response;
      }, error => {
        this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
      }
    );
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }
}
