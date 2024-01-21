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
import { ServiceService } from '../../api-services/service.service';
import { ConstsHelper } from '../../consts.helper';
import { HandleServiceInterface } from '../../models/handle-service.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-service',
  standalone: true,
  imports: [
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.css'
})
export class CreateServiceComponent implements OnInit {

  form: FormGroup;
  control: FormControl;
  formSubmitted: boolean;
  errors: any = {
    name: {
      required: `Ce champ est obligatoire.`,
    },
  }

  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServiceService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.formSubmitted = false;
    this.initForm();
  }

  initForm() {
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('id', this.formBuilder.control(null, []));
    this.form.addControl('name', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('isActive', this.formBuilder.control(true, [Validators.required]));
  }

  save() {
    this.formSubmitted = true;
    if (this.form.valid) {
      const service: HandleServiceInterface = this.form.getRawValue();
      this.serviceService.create(service).subscribe(
        response => {
          this.toastr.success('Le service est enregistré avec succès.', null, {positionClass: 'toast-top-center'});
          this.cancel();
        }, error => {
          this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
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
    this.router.navigate(['administration/services']);
  }
}
