import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.less']
})
export class ErrorDialogComponent implements OnInit {

  public errorMessage ? = this.data.dataKey;

  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
