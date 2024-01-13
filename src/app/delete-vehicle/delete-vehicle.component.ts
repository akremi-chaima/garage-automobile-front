import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { VehicleService } from '../api-services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConstsHelper } from '../consts.helper';

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
          this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
          this.cancel();
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
        this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
        this.cancel();
      }
    );
  }

  cancel() {
    this.router.navigate(['vehicles']);
  }
}
