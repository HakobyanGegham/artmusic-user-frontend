import {Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import FormHelper from '../../helpers/form-helper';
import {Applicant} from '../../models/applicant';
import {Subscription} from 'rxjs';
import {UploadDecodeBase64Service} from '../../services/upload-decode-base64.service';

@Component({
  selector: 'app-applicant-form',
  templateUrl: './applicant-form.component.html',
  styleUrls: ['./applicant-form.component.less']
})
export class ApplicantFormComponent extends FormHelper implements OnInit, OnChanges, OnDestroy {

  @Input() public applicant: Applicant;
  public newApplicant = new Applicant();
  private subscription = new Subscription();
  @ViewChild('passportCopyInput') private passportCopyInput: ElementRef;
  @ViewChild('profileImageInput') private profileImageInput: ElementRef;
  @ViewChild('uploadInput1') private uploadInput1: ElementRef;
  @ViewChild('uploadInput2') private uploadInput2: ElementRef;
  @Output() private audioUploaded = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private uploadDecodeBase64Service: UploadDecodeBase64Service) {
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
      profileImage: [''],
      upload1: [''],
      upload2: ['']
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
    this.newApplicant.id = this.applicant ? this.applicant.id : null;
    this.newApplicant.firstName = this.getFormControl('firstName').value;
    this.newApplicant.lastName = this.getFormControl('lastName').value;
    this.newApplicant.patriotic = this.getFormControl('patriotic').value;
    this.newApplicant.email = this.getFormControl('email').value;
    this.newApplicant.birthDate = this.getFormControl('birthDate').value;
    this.newApplicant.phoneNumber = this.getFormControl('phoneNumber').value;
    this.newApplicant.passportCopy = this.passportCopyInput.nativeElement.files ? this.passportCopyInput.nativeElement.files[0] : '';
    this.newApplicant.profileImage = this.profileImageInput.nativeElement.files ? this.passportCopyInput.nativeElement.files[0] : '';
    return this.newApplicant;
  }

  public imageUpload(inputElement: HTMLInputElement, field: string) {
    this.uploadDecodeBase64Service.getDecodedString(inputElement.files[0]).subscribe(decodedString => {
      this.newApplicant[field] = decodedString;
    });
  }

  public audioUpload(uploadInput: HTMLInputElement, key: number) {
    this.audioUploaded.emit({uploadInput, key});
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
