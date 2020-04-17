import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import FormHelper from '../../helpers/form-helper';
import {Applicant} from '../../models/applicant';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-applicant-form',
  templateUrl: './applicant-form.component.html',
  styleUrls: ['./applicant-form.component.less']
})
export class ApplicantFormComponent extends FormHelper implements OnInit, OnChanges, OnDestroy {

  @Input() public applicant: Applicant;
  private subscription = new Subscription();

  private static getInputContainerElements(inputElement: HTMLInputElement) {
    const inputContainer = inputElement.closest('.f_file-container');

    return {
      inputElement,
      inputContainer,
      button: inputElement.nextElementSibling as HTMLElement,
      background: inputContainer.querySelector('.f_percentage-background') as HTMLElement,
      text: inputContainer.querySelector('.f_percentage-text') as HTMLElement
    };
  }

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.applicant.currentValue) {
      this.applicant = changes.applicant.currentValue;
      this.setFormValues();
    }
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

  private setFormValues() {
    this.getFormControl('firstName').setValue(this.applicant.firstName);
    this.getFormControl('lastName').setValue(this.applicant.lastName);
    this.getFormControl('patriotic').setValue(this.applicant.patriotic);
    this.getFormControl('email').setValue(this.applicant.email);
    this.getFormControl('birthDate').setValue(this.applicant.birthDate);
    this.getFormControl('phoneNumber').setValue(this.applicant.phoneNumber);
  }

  public submit() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      this.formatBirthDate();
      return this.getFromFormValues();
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
    if (typeof birthDate !== 'string') {
      let day = birthDate.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month = (birthDate.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      const year = birthDate.getFullYear();
      const formattedBirthDate = `${year}-${month}-${day}`;
      this.getFormControl('birthDate').setValue(formattedBirthDate);
    }
  }

  private getFromFormValues() {
    const applicant = new Applicant();
    applicant.id = this.applicant ? this.applicant.id : null;
    applicant.firstName = this.getFormControl('firstName').value;
    applicant.lastName = this.getFormControl('lastName').value;
    applicant.patriotic = this.getFormControl('patriotic').value;
    applicant.email = this.getFormControl('email').value;
    applicant.birthDate = this.getFormControl('birthDate').value;
    applicant.phoneNumber = this.getFormControl('phoneNumber').value;

    return applicant;
  }

  public fileInputChange(inputElement: HTMLInputElement) {
    const inputContainerElements = ApplicantFormComponent.getInputContainerElements(inputElement);
    this.subscription.add(this.setPercentageCounter(inputContainerElements).subscribe(() => {
      setTimeout(() => {
        inputContainerElements.background.style.width = '0';
        inputContainerElements.text.style.fontSize = '0';
        inputContainerElements.button.innerHTML = 'Completed';
        inputContainerElements.button.style.fontSize = '18px';
      }, 800);
    }));
  }

  setPercentageCounter(inputContainerElements: any) {
    inputContainerElements.button.style.fontSize = '0';
    return new Observable<any>((observer) => {
      let i = 0;

      function setPercentage() {
        inputContainerElements.background.style.width = (i * 1.5) + 'px';
        inputContainerElements.text.innerHTML = i + '%';
        inputContainerElements.text.style.fontSize = '17px';
        i++;
        if (i > 100) {
          observer.next();
          observer.complete();
        } else {
          setTimeout(() => {
            setPercentage();
          }, 15);
        }
      }

      setPercentage();
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
