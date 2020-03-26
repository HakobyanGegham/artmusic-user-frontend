import {Component, OnInit} from '@angular/core';
import FormHelper from '../../helpers/form-helper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-application-program-form',
  templateUrl: './application-program-form.component.html',
  styleUrls: ['./application-program-form.component.less']
})
export class ApplicationProgramFormComponent extends FormHelper implements OnInit {

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      compositionName: ['', [Validators.required, Validators.minLength(4)]],
      compositionAuthor: ['', [Validators.required, Validators.minLength(4)]],
      compositionDurationMinutes: ['', [Validators.required]],
      compositionDurationSeconds: ['', [Validators.required]]
    });
  }

  public submit() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      return this.form.value;
    } else {
      this.validateAllFormFields(this.form);
      return false;
    }
  }
}
