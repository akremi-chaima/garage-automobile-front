import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { CommonModule } from '@angular/common';
import { UserInterface } from '../../models/user.interface';
import { UserService } from '../../api-services/user.service';
import { Router } from '@angular/router';
import { ConstsHelper } from '../../consts.helper';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  users: Array<UserInterface>;
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.users = [];
    this.userService.getList().subscribe(
      response => {
        this.users = response;
      }, error => {
        this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
      }
    );
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }
}
