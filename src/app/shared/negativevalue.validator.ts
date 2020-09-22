import { AbstractControl, ValidationErrors } from '@angular/forms';

export class NegativeCheckingValidator {
  static isNegative(control: AbstractControl): ValidationErrors | null {
    if (control.value != null) {
      if (control.value < 0) {
        return {
          negativeValue: true,
        };
      }
      if (control.value == 0) {
        return {
          valueIsZero: true,
        };
      }
    }
    return null;
  }
}
