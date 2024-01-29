import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HandleServiceInterface } from '../../models/handle-service.interface';
import { ConstsHelper } from '../../consts.helper';
import { UserService } from '../../api-services/user.service';

@Component({
  selector: 'app-update-password',
  standalone: true,
    imports: [
      FormsModule,
      CommonModule,
      ReactiveFormsModule
    ],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent implements OnInit {

  form: FormGroup;
  control: FormControl;
  formSubmitted: boolean;
  errors: any = {
    password: {
      required: `Ce champ est obligatoire.`,
    },
    newPassword: {
      required: `Ce champ est obligatoire.`,
    },
    newPasswordConfirmation: {
      required: `Ce champ est obligatoire.`,
    },
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formSubmitted = false;
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('password', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('newPassword', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('newPasswordConfirmation', this.formBuilder.control('', [Validators.required]));
  }

  save() {
    this.formSubmitted = true;
    if (this.form.valid) {
      const data: HandleServiceInterface = this.form.getRawValue();
      this.userService.updatePassword(data).subscribe(
        response => {
          this.toastr.success('Le mot de passe a été modifié avec succès.', null, {positionClass: 'toast-top-center'});
          this.initForm();
        }, error => {
          if (error.status === 401) {
            // delete token from local storage and redirect to login page
            this.router.navigate(['administration/login']);
            localStorage.removeItem('token');
          } else if (error.error.error_message == 'Invalid password') {
            this.toastr.error('Le mot de passe saisie est invalide.', null, {positionClass: 'toast-top-center'});
          } else {
            // Error to call API
            this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
          }
        }
      );
    }
  }

  getError(formControlValues: string): string {
    let errorMsg = '';
    if (this.form.controls[formControlValues].invalid) {
      Object.keys(this.form.controls[formControlValues].errors).map(
        key => {
          errorMsg = this.errors[formControlValues][key];
        }
      );
    }
    return errorMsg;
  }
}
