import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-application-add-confirm-dialog',
  templateUrl: './application-add-confirm-dialog.component.html',
  styleUrls: ['./application-add-confirm-dialog.component.less']
})
export class ApplicationAddConfirmDialogComponent {

  constructor(public dialogRef: MatDialogRef<ApplicationAddConfirmDialogComponent>,
              private router: Router) {
  }

  onNoClick() {
    this.dialogRef.close();
    this.router.navigateByUrl('user');
  }
}
