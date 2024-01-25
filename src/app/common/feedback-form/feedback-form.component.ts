import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConstsHelper } from '../../consts.helper';
import { FeedbackService } from '../../api-services/feedback.service';
import { CreateFeedbackInterface } from '../../models/create-feedback.interface';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
    imports: [
      FormsModule,
      CommonModule,
      ReactiveFormsModule
    ],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.css'
})
export class FeedbackFormComponent implements OnInit {

  @Input()
  isPublic: boolean;

  form: FormGroup;
  control: FormControl;
  formSubmitted: boolean;
  stars: Array<number>;
  starsNumber: number;
  errors: any = {
    lastName: {
      required: `Ce champ est obligatoire.`,
    },
    firstName: {
      required: `Ce champ est obligatoire.`,
    },
    message: {
      required: `Ce champ est obligatoire.`,
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private feedbackService: FeedbackService,
  ) {
  }

  ngOnInit() {
    this.stars = [5, 4, 3, 2, 1];
    this.formSubmitted = false;
    this.starsNumber = 0;
    this.initForm();
  }

  initForm() {
    this.formSubmitted = false;
    this.starsNumber = 0;
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('lastName', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('firstName', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('message', this.formBuilder.control('', [Validators.required]));
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

  setStars(stars: number){
    this.starsNumber = stars;
  }

  save() {
    this.formSubmitted = true;
    if (this.form.valid && this.starsNumber > 0) {
      const feedback: CreateFeedbackInterface = {
        lastName: this.form.get('lastName').value,
        firstName: this.form.get('firstName').value,
        message: this.form.get('message').value,
        stars: this.starsNumber,
        createdAt: null
      };
      this.feedbackService.add(feedback, this.isPublic).subscribe(
        response => {
          this.toastr.success('Votre avis a été enregistré avec succès.', null, {positionClass: 'toast-top-center'});
          this.initForm();
        }, error => {
          this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
        }
      );
    }
  }

  cancel() {
    history.back()
  }
}
