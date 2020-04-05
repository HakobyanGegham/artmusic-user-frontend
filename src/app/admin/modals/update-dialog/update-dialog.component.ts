import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import FormHelper from '../../../helpers/form-helper';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.less']
})
export class UpdateDialogComponent extends FormHelper implements OnInit {

  public languages = ['hy', 'ru', 'en'];

  @Output() OnSubmitClick = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<UpdateDialogComponent>,
              private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  public onNoClick(event: Event) {
    event.preventDefault();
    this.dialogRef.close();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      names: this.formBuilder.array([])
    });

    this.addItemsToNames();
  }

  private addItemsToNames() {
    const data = {name: '', key: ''};
    const names = this.data.dataKey.names;
    this.languages.forEach(lang => {
      data.key = lang;
      data.name = '';

      if (names[lang]) {
        data.name = names[lang];
      }

      const formGroup = this.formBuilder.group({
        name: [data.name, [Validators.required]],
        key: [data.key],
      });

      this.getFormControlAsArray('names').push(formGroup);
    });
  }

  public onSubmit(value: any) {
    this.OnSubmitClick.emit(value);
    this.dialogRef.close();
  }
}
