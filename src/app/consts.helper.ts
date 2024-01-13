import { Injectable } from '@angular/core';

@Injectable()
export class ConstsHelper {
  static readonly ERROR_OCCURRED_RETRY_MESSAGE = 'Oups, nous avons rencontré un petit souci... Nous vous invitons à ré-essayer plus tard.';
  static readonly emailPattern: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  static readonly pricePattern: RegExp = /^\d*\.?\d*$/;
  static readonly manufacturingYearPattern: RegExp = /^\d{4}$/;
  static readonly fiscalPowerPattern: RegExp = /^\d{1,2}$/;
  static readonly mileagePattern: RegExp = /^\d{1,6}$/;
}
