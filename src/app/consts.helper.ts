import { Injectable } from '@angular/core';

@Injectable()
export class ConstsHelper {
  static readonly emailPattern: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
}
