import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { VehicleService } from '../../api-services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConstsHelper } from '../../consts.helper';
import { PictureInterface } from '../../models/picture.interface';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { environment } from '../../../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PictureService } from '../../api-services/picture.service';

@Component({
  selector: 'app-handle-vehicle-pictures',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './handle-vehicle-pictures.component.html',
  styleUrl: './handle-vehicle-pictures.component.css'
})
export class HandleVehiclePicturesComponent implements OnInit {

  @ViewChild('fileUploader') fileUploader: ElementRef;
  pictures: Array<PictureInterface>;
  selectedPicture: File|null;
  environment = environment;

  constructor(
    private vehicleService: VehicleService,
    private pictureService: PictureService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.pictures = [];
    this.selectedPicture = null;
    if (this.route.snapshot.paramMap.get('id')) {
      this.getPictures();
    } else {
      this.cancel();
    }
  }

  delete(pictureId: number) {
    this.router.navigate(['administration/vehicle/' + this.route.snapshot.paramMap.get('id') + '/delete/picture/' + pictureId]);
  }

  cancel() {
    this.router.navigate(['administration/vehicles']);
  }

  getFile($event) {
    this.selectedPicture = $event.target.files[0];
  }

  close() {
    this.selectedPicture = null;
  }

  save() {
    this.pictureService.save(this.selectedPicture, parseInt(this.route.snapshot.paramMap.get('id'), 10)).subscribe(
      response => {
        this.toastr.success('L\'image est enregistré avec succès.', null, {positionClass: 'toast-top-center'});
        this.getPictures();
      }, error => {
        if (error.status === 401) {
          // delete token from local storage and redirect to login page
          this.router.navigate(['administration/login']);
          localStorage.removeItem('token');
        } else {
          // Error to call API
          this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
        }
      }
    );
  }

  getPictures() {
    this.vehicleService.get(parseInt(this.route.snapshot.paramMap.get('id'), 10)).subscribe(
      response => {
        this.selectedPicture = null;
        this.fileUploader.nativeElement.value = null;
        this.pictures = response.pictures;
      }, error => {
        if (error.status === 401) {
          // delete token from local storage and redirect to login page
          this.router.navigate(['administration/login']);
          localStorage.removeItem('token');
        } else {
          // Error to call API
          this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
        }
      }
    );
  }
}
