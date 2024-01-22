import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { ServiceService } from '../../api-services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConstsHelper } from '../../consts.helper';

@Component({
  selector: 'app-delete-service',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './delete-service.component.html',
  styleUrl: './delete-service.component.css'
})
export class DeleteServiceComponent implements OnInit {

  constructor(
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.serviceService.get(parseInt(this.route.snapshot.paramMap.get('id'), 10)).subscribe(
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
    this.serviceService.delete(parseInt(this.route.snapshot.paramMap.get('id'), 10)).subscribe(
      response => {
        this.toastr.success('Le service a été supprimé avec succès.', null, {positionClass: 'toast-top-center'});
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
    this.router.navigate(['administration/services']);
  }
}
