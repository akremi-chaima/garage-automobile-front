import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceInterface } from '../models/service.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../api-services/service.service';
import { ConstsHelper } from '../consts.helper';
import { HandleServiceInterface } from '../models/handle-service.interface';

@Component({
  selector: 'app-update-service',
  standalone: true,
  imports: [
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './update-service.component.html',
  styleUrl: './update-service.component.css'
})
export class UpdateServiceComponent implements OnInit {

  form: FormGroup;
  control: FormControl;
  formSubmitted: boolean;
  service: ServiceInterface|null;
  errors: any = {
    name: {
      required: `Ce champ est obligatoire.`,
    },
  }

  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.service = null;
    this.formSubmitted = false;
    if (this.route.snapshot.paramMap.get('id')) {
    this.serviceService.get(parseInt(this.route.snapshot.paramMap.get('id'), 10)).subscribe(
      response => {
        this.service = response;
        this.initForm();
      }, error => {
        this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
        this.cancel();
      }
    );
    } else {
      this.cancel();
    }
  }

  initForm() {
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('id', this.formBuilder.control(this.service.id, [Validators.required]));
    this.form.addControl('name', this.formBuilder.control(this.service.name, [Validators.required]));
    this.form.addControl('isActive', this.formBuilder.control(this.service.isActive, [Validators.required]));
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

  save() {
    this.formSubmitted = true;
    if (this.form.valid) {
      const service: HandleServiceInterface = this.form.getRawValue();
      this.serviceService.update(service).subscribe(
        response => {
          this.toastr.success('Le service est enregistré avec succès.', null, {positionClass: 'toast-top-center'});
          this.cancel();
        }, error => {
          this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['services']);
  }
}
