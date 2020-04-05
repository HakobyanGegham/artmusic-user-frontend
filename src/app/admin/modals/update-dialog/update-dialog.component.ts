import {Component, EventEmitter, Inject, LOCALE_ID, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
  public parentItems = this.data.dataKey.parentItem;
  public item = this.data.dataKey.item;
  public parentId = this.data.dataKey.parentId;
  @Output() OnSubmitClick = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(LOCALE_ID) public locale: string,
              public dialogRef: MatDialogRef<UpdateDialogComponent>,
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

    this.setParentItem();
    this.addItemsToNames();
  }

  private setParentItem() {
    const selectedItem = this.parentItems.find(parentItem => {
      return parentItem.id === this.item[this.parentId];
    });

    this.getFormControl('parentItem').setValue(selectedItem.id);
  }

  private addItemsToNames() {
    const data = {name: '', key: ''};
    const names = this.item.names;
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
