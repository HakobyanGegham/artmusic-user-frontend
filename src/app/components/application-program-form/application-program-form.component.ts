import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import FormHelper from '../../helpers/form-helper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApplicationProgram} from '../../models/application-program';
import {UploadDecodeBase64Service} from '../../services/upload-decode-base64.service';

@Component({
  selector: 'app-application-program-form',
  templateUrl: './application-program-form.component.html',
  styleUrls: ['./application-program-form.component.less']
})
export class ApplicationProgramFormComponent extends FormHelper implements OnInit, OnChanges {

  @Input() public program: ApplicationProgram;
  public newProgram = new ApplicationProgram();

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.program.currentValue) {
      this.program = changes.program.currentValue;
      this.setFormValues();
    }
  }

  private initForm() {
    this.form = this.formBuilder.group({
      compositionName: ['', [Validators.required, Validators.minLength(4)]],
      compositionAuthor: ['', [Validators.required, Validators.minLength(4)]],
      durationMinutes: [1],
      durationSeconds: [0]
    });
  }

  public submit() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      return this.getFromFormValues();
    } else {
      this.validateAllFormFields(this.form);
      return false;
    }
  }

  private setFormValues() {
    this.getFormControl('compositionName').setValue(this.program.compositionName);
    this.getFormControl('compositionAuthor').setValue(this.program.compositionAuthor);
    this.getFormControl('durationMinutes').setValue(this.program.durationMinutes);
    this.getFormControl('durationSeconds').setValue(this.program.durationSeconds);

    this.form.markAllAsTouched();
  }

  private getFromFormValues() {
    this.newProgram.id = this.program ? this.program.id : null;
    this.newProgram.compositionAuthor = this.getFormControl('compositionAuthor').value;
    this.newProgram.compositionName = this.getFormControl('compositionName').value;
    this.newProgram.durationMinutes = this.getFormControl('durationMinutes').value;
    this.newProgram.durationSeconds = this.getFormControl('durationSeconds').value;
    return this.newProgram;
  }

  public audioUploaded(element: any) {
    const inputElement = element as HTMLInputElement;
    this.newProgram.upload = inputElement.files[0];
  }
}
