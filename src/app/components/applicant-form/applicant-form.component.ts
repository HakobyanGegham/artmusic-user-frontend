import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import FormHelper from '../../helpers/form-helper';

@Component({
  selector: 'app-applicant-form',
  templateUrl: './applicant-form.component.html',
  styleUrls: ['./applicant-form.component.less']
})
export class ApplicantFormComponent extends FormHelper implements OnInit {

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      patriotic: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      passportCopy: [''],
      image: [''],
      upload: ['']
    });
  }

  public submit() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      this.formatBirthDate();
      return this.form.value;
    } else {
      this.validateAllFormFields(this.form);
      return false;
    }
  }

  public passportBtnClick(passportCopyInput: HTMLInputElement) {
    passportCopyInput.click();
  }

  public imageBtnClick(imageInput: HTMLInputElement) {
    imageInput.click();
  }

  public audioBtnClick(audioInput: HTMLInputElement) {
    audioInput.click();
  }

  private formatBirthDate() {
    const birthDate = this.getFormControl('birthDate').value;
    let day = birthDate.getDate().toString();
    day = +day < 10 ? '0' + day : day;
    let month = (birthDate.getMonth() + 1).toString();
    month = +month < 10 ? '0' + month : month;
    const year = birthDate.getFullYear();
    const formattedBirthDate = `${year}-${month}-${day}`;
    this.getFormControl('birthDate').setValue(formattedBirthDate);
  }
}
