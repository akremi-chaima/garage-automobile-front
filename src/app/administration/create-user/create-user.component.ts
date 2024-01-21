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
import { Router } from '@angular/router';
import { ConstsHelper } from '../../consts.helper';
import { UserService } from '../../api-services/user.service';
import { HandleUserInterface } from '../../models/handle-user.interface';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {

  form: FormGroup;
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
    password: {
      required: `Ce champ est obligatoire.`,
    },
    passwordConfirmation: {
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
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.formSubmitted = false;
    this.isSamePassword = true;
    this.initForm();
  }

  initForm() {
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('id', this.formBuilder.control(null, []));
    this.form.addControl('password', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('passwordConfirmation', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('firstName', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('lastName', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('email', this.formBuilder.control('', [Validators.required, Validators.pattern(ConstsHelper.emailPattern)]));
    this.form.addControl('role', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('isActive', this.formBuilder.control(true, [Validators.required]));
  }

  save() {
    this.formSubmitted = true;
    this.isSamePassword = true;
    if (this.form.valid) {
      if (this.form.get('password').value !== this.form.get('passwordConfirmation').value) {
        this.isSamePassword = false;
      } else {
        const user: HandleUserInterface = {
          id: null,
          firstname: this.form.get('firstName').value,
          lastname: this.form.get('lastName').value,
          role: this.form.get('role').value,
          email: this.form.get('email').value,
          password: this.form.get('password').value,
          isActive: this.form.get('isActive').value
        }
        this.userService.create(user).subscribe(
          response => {
            this.toastr.success('L\'utilisateur est enregistré avec succès.', null, {positionClass: 'toast-top-center'});
            this.cancel();
          }, error => {
            if (error.error.error_message.includes('used')) {
              this.toastr.error('L\'email est déjà utilisé.', null, {positionClass: 'toast-top-center'});
            } else {
              this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
            }

          }
        );
      }
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
