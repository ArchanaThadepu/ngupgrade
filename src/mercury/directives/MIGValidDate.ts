import {Directive, ElementRef} from '@angular/core';
import {NG_VALIDATORS, Validator, ValidatorFn, FormControl, AbstractControl} from '@angular/forms';

@Directive({
  selector: '[mig-valid-date]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MIGValidDate, multi: true }
  ]
})
export class MIGValidDate implements Validator {
  private readonly _valFn: ValidatorFn;
  protected readonly DATE_REGEX = new RegExp(/^(\d{2}|\d{1})\/(\d{2}|\d{1})\/\d{4}$/);
  private readonly MIN_AGE = 15;
  private readonly MAX_AGE = 98;

  constructor(el: ElementRef) {
    console.log("MIGValidDate -- directive -- ctor")
    this._valFn = this.dateValidator();
  }

  validate(control: FormControl) {
    return this._valFn(control);
  }

  public dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [p: string]: any } | null => {
      
      const dateStr = control.value;
      // Length of months (will update for leap years)
      const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
      // Object to return if date is invalid
      const invalidObj = { 'date': true };

      // First check for m/d/yyyy or mm/dd/yyyy format
      // If the pattern is wrong, don't validate dates yet
      if (!this.DATE_REGEX.test(dateStr)) {
        console.log("directive -- not a date")
        return {inValidFormat : true};
      }

      // Parse the date input to integers
      const parts = dateStr.split('/');
      const month = parseInt(parts[0], 10);
      const day = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      // Make sure date is in range
      if (year < 2000 || year > 3000 || month === 0 || month > 12) {
        return invalidObj;
      }
      // Adjust for leap years
      if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        monthLength[1] = 29;
      }
      // Check the range of the day
      if (!(day > 0 && day <= monthLength[month - 1])) {
        return invalidObj;
      }
      return null;
    };
  }
}
