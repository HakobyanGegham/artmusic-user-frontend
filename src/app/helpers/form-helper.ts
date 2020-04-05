import {FormArray, FormGroup} from '@angular/forms';

export default class FormHelper {

  public form: FormGroup;
  protected formSubmitAttempt: boolean;

  public getFormControl(name) {
    return this.form.get(name);
  }

  public getFormControlAsArray(name) {
    return this.form.get(name) as FormArray;
  }

  public isFieldValid(field: string) {
    return (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt);
  }

  protected validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({onlySelf: true});
    });
  }

  public displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field)
    };
  }
}
