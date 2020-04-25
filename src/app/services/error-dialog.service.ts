import {Injectable, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../components/modals/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  constructor(private dialog: MatDialog) {
  }

  showMessage(errorMessage: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: {
        dataKey: errorMessage
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
