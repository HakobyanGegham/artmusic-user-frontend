import {Injectable, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../components/modals/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private dialog: MatDialog) {}

  showError(errorMessage: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: errorMessage
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
