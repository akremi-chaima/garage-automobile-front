import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConstsHelper } from '../../consts.helper';
import { OpeningHourService } from '../../api-services/opening-hour.service';

@Component({
  selector: 'app-delete-opening-hour',
  standalone: true,
    imports: [
      HeaderComponent
    ],
  templateUrl: './delete-opening-hour.component.html',
  styleUrl: './delete-opening-hour.component.css'
})
export class DeleteOpeningHourComponent implements OnInit {

  constructor(
    private openingHourService: OpeningHourService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.openingHourService.get(parseInt(this.route.snapshot.paramMap.get('id'), 10)).subscribe(
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
    this.openingHourService.delete(parseInt(this.route.snapshot.paramMap.get('id'), 10)).subscribe(
      response => {
        this.toastr.success('L\'horaire d\'ouverture a été supprimé avec succès.', null, {positionClass: 'toast-top-center'});
        this.cancel();
      }, error => {
        this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
        this.cancel();
      }
    );
  }

  cancel() {
    this.router.navigate(['administration/opening-hours']);
  }
}
