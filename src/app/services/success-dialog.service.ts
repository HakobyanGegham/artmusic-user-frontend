import {Injectable} from '@angular/core';
import {ErrorDialogComponent} from '../components/modals/error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SuccessDialogComponent} from '../components/modals/success-dialog/success-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class SuccessDialogService {

  constructor(private dialog: MatDialog) {
  }

  showMessage(message) {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '300px',
      data: {
        dataKey: message
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
