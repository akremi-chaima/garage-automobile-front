import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
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
import { ActivatedRoute } from '@angular/router';

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

  pictures: Array<string>;
  form: FormGroup;
  control: FormControl;
  formSubmitted: boolean;
  subject: string|null;
  errors: any = {
    subject: {
      required: `Ce champ est obligatoire.`,
    },
    lastName: {
      required: `Ce champ est obligatoire.`,
    },
    firstName: {
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
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.formSubmitted = false;
    this.subject = null;
    this.pictures = [
      './assets/images/contact-us-1.jpeg'
    ];
    if (this.route.snapshot.paramMap.get('subject')) {
      console.log(this.route.snapshot.paramMap.get('subject'));
      this.subject = this.route.snapshot.paramMap.get('subject');
    }
    this.initForm();
  }

  initForm() {
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('subject', this.formBuilder.control({value: this.subject, disabled: this.subject !== null}, [Validators.required]));
    this.form.addControl('lastName', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('firstName', this.formBuilder.control('', [Validators.required]));
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
}
