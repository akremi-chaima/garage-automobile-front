import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConstsHelper } from '../../consts.helper';
import { PictureService } from '../../api-services/picture.service';

@Component({
  selector: 'app-delete-picture',
  standalone: true,
    imports: [
      HeaderComponent
    ],
  templateUrl: './delete-picture.component.html',
  styleUrl: './delete-picture.component.css'
})
export class DeletePictureComponent implements OnInit {

  constructor(
    private pictureService: PictureService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    if (!this.route.snapshot.paramMap.get('vehicleId') || !this.route.snapshot.paramMap.get('pictureId')) {
      this.cancel();
    }
  }

  delete() {
    this.pictureService.delete(parseInt(this.route.snapshot.paramMap.get('pictureId'), 10)).subscribe(
      response => {
        this.toastr.success('L\'image a été supprimée avec succès.', null, {positionClass: 'toast-top-center'});
        this.cancel();
      }, error => {
        this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
        this.cancel();
      }
    );
  }

  cancel() {
    this.router.navigate(['administration/vehicle/pictures/' + this.route.snapshot.paramMap.get('vehicleId')]);
  }
}
