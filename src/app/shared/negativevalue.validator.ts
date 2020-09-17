import { AbstractControl, ValidationErrors } from '@angular/forms';

export class NegativeCheckingValidator {
  static isNegative(control: AbstractControl): ValidationErrors | null {
    if (control.value != null) {
      if (control.value < 0) {
        alert('You Enter Negative Value!!');
        return {
          negativeValue: true,
        };
      }
    }
    return null;
  }
}
