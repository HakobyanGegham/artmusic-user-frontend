import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-remove-application-dialog',
  templateUrl: './remove-application-dialog.component.html',
  styleUrls: ['./remove-application-dialog.component.less']
})
export class RemoveApplicationDialogComponent implements OnInit {

  @Output() remove = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<RemoveApplicationDialogComponent>) {
  }

  ngOnInit(): void {
  }

  public onNoClick() {
    this.dialogRef.close();
  }

  public removeEvent() {
    this.remove.emit();
  }
}
