import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../api-services/user.service';
import { ConstsHelper } from '../../consts.helper';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    if (!this.route.snapshot.paramMap.get('id')) {
      this.cancel();
    }
  }

  delete() {
    this.userService.delete(parseInt(this.route.snapshot.paramMap.get('id'), 10)).subscribe(
      response => {
        this.toastr.success('L\'utilisateur a été supprimé avec succès.', null, {positionClass: 'toast-top-center'});
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
    this.router.navigate(['administration/users']);
  }
}
