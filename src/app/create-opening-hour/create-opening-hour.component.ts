import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { OpeningHourService } from '../api-services/opening-hour.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConstsHelper } from '../consts.helper';
import { HandleOpeningHourInterface } from '../models/handle-opening-hour.interface';

@Component({
  selector: 'app-create-opening-hour',
  standalone: true,
    imports: [
      HeaderComponent,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
    ],
  templateUrl: './create-opening-hour.component.html',
  styleUrl: './create-opening-hour.component.css'
})
export class CreateOpeningHourComponent implements OnInit {

  form: FormGroup;
  control: FormControl;
  formSubmitted: boolean;
  errors: any = {
    day: {
      required: `Ce champ est obligatoire.`,
    },
    morningStartHour: {
      pattern: `La valeur saisie n'est pas valide HH:MM.`
    },
    morningEndHour: {
      pattern: `La valeur saisie n'est pas valide HH:MM.`
    },
    afternoonStartHour: {
      pattern: `La valeur saisie n'est pas valide HH:MM.`
    },
    afternoonEndHour: {
      pattern: `La valeur saisie n'est pas valide HH:MM.`
    },
  }

  constructor(
    private formBuilder: FormBuilder,
    private openingHourService: OpeningHourService,
    private route: ActivatedRoute,
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
    this.form.addControl('day', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('morningStartHour', this.formBuilder.control('', [Validators.pattern(ConstsHelper.morningStartHour)]));
    this.form.addControl('morningEndHour', this.formBuilder.control('', [Validators.pattern(ConstsHelper.morningEndHour)]));
    this.form.addControl('afternoonStartHour', this.formBuilder.control('', [Validators.pattern(ConstsHelper.afternoonStartHour)]));
    this.form.addControl('afternoonEndHour', this.formBuilder.control('', [Validators.pattern(ConstsHelper.afternoonEndHour)]));
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
      const openingHour: HandleOpeningHourInterface = this.form.getRawValue();
      this.openingHourService.create(openingHour).subscribe(
        response => {
          this.toastr.success('L\'horaire d\'ouverture est enregistré avec succès.', null, {positionClass: 'toast-top-center'});
          this.cancel();
        }, error => {
          this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['opening-hours']);
  }
}
