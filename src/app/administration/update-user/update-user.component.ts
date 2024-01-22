import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
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
import { ActivatedRoute, Router } from '@angular/router';
import { ConstsHelper } from '../../consts.helper';
import { UserService } from '../../api-services/user.service';
import { HandleUserInterface } from '../../models/handle-user.interface';
import { UserInterface } from '../../models/user.interface';

@Component({
  selector: 'app-update-user',
  standalone: true,
    imports: [
      HeaderComponent,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
    ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {

  form: FormGroup;
  user: UserInterface|null;
  control: FormControl;
  formSubmitted: boolean;
  isSamePassword: boolean;
  errors: any = {
    firstName: {
      required: `Ce champ est obligatoire.`,
    },
    lastName: {
      required: `Ce champ est obligatoire.`,
    },
    role: {
      required: `Ce champ est obligatoire.`,
    },
    email: {
      required: `Ce champ est obligatoire.`,
      pattern: `L'adresse email saisie n'est pas valide.`
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.formSubmitted = false;
    this.isSamePassword = true;
    this.user = null;
    if (this.route.snapshot.paramMap.get('id')) {
      this.userService.get(parseInt(this.route.snapshot.paramMap.get('id'), 10)).subscribe(
        response => {
          this.user = response;
          this.initForm();
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

  initForm() {
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('id', this.formBuilder.control(this.user.id, [Validators.required]));
    this.form.addControl('firstName', this.formBuilder.control(this.user.firstName, [Validators.required]));
    this.form.addControl('lastName', this.formBuilder.control(this.user.lastName, [Validators.required]));
    this.form.addControl('email', this.formBuilder.control(this.user.email, [Validators.required, Validators.pattern(ConstsHelper.emailPattern)]));
    this.form.addControl('role', this.formBuilder.control(this.user.role, [Validators.required]));
    this.form.addControl('isActive', this.formBuilder.control(this.user.isActive, [Validators.required]));
  }

  save() {
    this.formSubmitted = true;
    this.isSamePassword = true;
    if (this.form.valid) {
      const user: HandleUserInterface = {
        id: this.user.id,
        firstname: this.form.get('firstName').value,
        lastname: this.form.get('lastName').value,
        role: this.form.get('role').value,
        email: this.form.get('email').value,
        password: null,
        isActive: this.form.get('isActive').value
      }
      this.userService.update(user).subscribe(
        response => {
          this.toastr.success('L\'utilisateur est enregistré avec succès.', null, {positionClass: 'toast-top-center'});
          this.cancel();
        }, error => {
          if (error.error.error_message.includes('used')) {
            this.toastr.error('L\'email est déjà utilisé.', null, {positionClass: 'toast-top-center'});
          } else if (error.status === 401) {
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

  cancel() {
    this.router.navigate(['administration/users']);
  }
}
