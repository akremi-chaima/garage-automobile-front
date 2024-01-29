import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ConstsHelper } from '../../consts.helper';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../api-services/login.service';
import { LocalStorageService } from '../../api-services/local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  control: FormControl;
  loginFormSubmitted: boolean;
  errors: any = {
    email: {
      required: `L'adresse email est obligatoire.`,
      pattern: `L'adresse email saisie n'est pas valide.`
    },
    password: {
      required: `Le mot de passe est obligatoire.`,
    }
  };

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.loginFormSubmitted = false;
    this.initForm();
  }

  initForm() {
    this.control = this.formBuilder.control('', Validators.required);
    this.loginForm = this.formBuilder.group({});
    this.loginForm.addControl('email', this.formBuilder.control('', [Validators.required, Validators.pattern(ConstsHelper.emailPattern)]));
    this.loginForm.addControl('password', this.formBuilder.control('', [Validators.required]));
  }

  signIn() {
    this.loginFormSubmitted = true;
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.getRawValue()).subscribe(
        response => {
          this.localStorageService.save(response);
        }, error => {
          this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
        }
      );
    }
  }

  getError(formControlValues: string): string {
    let errorMsg = '';
    if (this.loginForm.controls[formControlValues].invalid) {
      Object.keys(this.loginForm.controls[formControlValues].errors).map(
        key => {
          errorMsg = this.errors[formControlValues][key];
        }
      );
    }
    return errorMsg;
  }
}
