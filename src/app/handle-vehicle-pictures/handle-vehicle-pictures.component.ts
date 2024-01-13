import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { VehicleService } from '../api-services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConstsHelper } from '../consts.helper';
import { PictureInterface } from '../models/picture.interface';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-handle-vehicle-pictures',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    NgOptimizedImage,
  ],
  templateUrl: './handle-vehicle-pictures.component.html',
  styleUrl: './handle-vehicle-pictures.component.css'
})
export class HandleVehiclePicturesComponent implements OnInit {

  pictures: Array<PictureInterface>;
  environment = environment;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.pictures = [];
    if (this.route.snapshot.paramMap.get('id')) {
      this.vehicleService.get(parseInt(this.route.snapshot.paramMap.get('id'), 10)).subscribe(
        response => {
          this.pictures = response.pictures;
        }, error => {
          this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
          this.cancel();
        }
      );
    } else {
      this.cancel();
    }
  }

  delete(pictureId: number) {
    this.router.navigate(['vehicle/' + this.route.snapshot.paramMap.get('id') + '/delete/picture/' + pictureId]);
  }

  cancel() {
    this.router.navigate(['vehicles']);
  }

  add() {

  }
}
