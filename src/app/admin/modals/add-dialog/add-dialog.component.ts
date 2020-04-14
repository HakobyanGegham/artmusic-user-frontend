import {Component, EventEmitter, Inject, LOCALE_ID, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import FormHelper from '../../../helpers/form-helper';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.less']
})
export class AddDialogComponent extends FormHelper implements OnInit {

  public languages = ['hy', 'ru', 'en'];
  public parentItems ? = this.data.dataKey.parentItem;
  public placeholder ? = this.data.dataKey.placeholder;
  @Output() OnSubmitClick = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(LOCALE_ID) public locale: string,
              public dialogRef: MatDialogRef<AddDialogComponent>,
              private formBuilder: FormBuilder) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public onNoClick(event: Event) {
    event.preventDefault();
    this.dialogRef.close();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      parentItem: [],
      names: this.formBuilder.array([])
    });
    this.setItems();
  }

  public onSubmit(value: any) {
    this.OnSubmitClick.emit(value);
    this.dialogRef.close();
  }

  private setItems() {
    this.languages.forEach(language => {
      const formGroup = this.formBuilder.group({
        name: ['', [Validators.required]],
        lang: [language],
      });
      this.getFormControlAsArray('names').push(formGroup);
    });
  }
}
