import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { OpeningHourService } from '../api-services/opening-hour.service';
import { OpeningHourInterface } from '../models/opening-hour.interface';
import { HeaderCarouselComponent } from '../header-carousel/header-carousel.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule, Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConstsHelper } from '../consts.helper';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeaderCarouselComponent,
    ReactiveFormsModule
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit{

  openingHours: Array<OpeningHourInterface>;
  pictures: Array<string>;
  form: FormGroup;
  control: FormControl;
  formSubmitted: boolean;
  errors: any = {
    name: {
      required: `Ce champ est obligatoire.`,
    },
    email: {
      required: `L'adresse email est obligatoire.`,
      pattern: `L'adresse email saisie n'est pas valide.`
    },
    message: {
      required: `Ce champ est obligatoire.`,
    },
    phoneNumber: {
      pattern: `Ce champ n'est pas valide.`,
    }
  }

  constructor(
    private openingHourService: OpeningHourService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.formSubmitted = false;
    this.initForm();
    this.openingHours = [];
    this.pictures = [
      './assets/images/contact-us-1.jpeg'
    ];
    this.openingHourService.getList().subscribe(
      response => {
        this.openingHours = response;
      }
    );
  }

  initForm() {
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('name', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('email', this.formBuilder.control('', [Validators.required, Validators.pattern(ConstsHelper.emailPattern)]));
    this.form.addControl('message', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('phoneNumber', this.formBuilder.control('', [Validators.pattern(ConstsHelper.phoneNumber)]));
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
      //@TODO add API call to send email
    }
  }

  formattingOpeningHours(startHour: string|null, endHour: string|null) {
    let text = '';
    if (startHour) {
      text += startHour;
    }
    if (endHour) {
      text += ' - ' + endHour;
    }

    return text;
  }
}
