import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { VehicleService } from '../../api-services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConstsHelper } from '../../consts.helper';

@Component({
  selector: 'app-delete-vehicle',
  standalone: true,
    imports: [
      HeaderComponent
    ],
  templateUrl: './delete-vehicle.component.html',
  styleUrl: './delete-vehicle.component.css'
})
export class DeleteVehicleComponent implements OnInit {

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.vehicleService.get(parseInt(this.route.snapshot.paramMap.get('id'), 10)).subscribe(
        response => {
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
    } else {
      this.cancel();
    }
  }

  delete() {
    this.vehicleService.delete(parseInt(this.route.snapshot.paramMap.get('id'), 10)).subscribe(
      response => {
        this.toastr.success('Le véhicule a été supprimé avec succès.', null, {positionClass: 'toast-top-center'});
        this.cancel();
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

  cancel() {
    this.router.navigate(['administration/vehicles']);
  }
}
