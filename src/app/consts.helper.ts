import { Injectable } from '@angular/core';

@Injectable()
export class ConstsHelper {
  static readonly ERROR_OCCURRED_RETRY_MESSAGE = 'Oups, nous avons rencontré un petit souci... Nous vous invitons à ré-essayer plus tard.';
  static readonly emailPattern: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  static readonly phoneNumber: RegExp = /^0[1|2|3|4|5|6|7][0-9]{8}$/;
  static readonly pricePattern: RegExp = /^\d*\.?\d*$/;
  static readonly zipCodePattern: RegExp = /\b\d{5}\b/;
  static readonly manufacturingYearPattern: RegExp = /^\d{4}$/;
  static readonly fiscalPowerPattern: RegExp = /^\d{1,2}$/;
  static readonly mileagePattern: RegExp = /^\d{1,6}$/;
  static readonly morningStartHour: RegExp = /^(08|09):[0-5][0-9]$/;
  static readonly morningEndHour: RegExp = /^(1[0-2]):[0-5][0-9]$/;
  static readonly afternoonStartHour: RegExp = /^(1[4-8]):[0-5][0-9]$/;
  static readonly afternoonEndHour: RegExp = /^(1[4-8]):[0-5][0-9]$/;
}
