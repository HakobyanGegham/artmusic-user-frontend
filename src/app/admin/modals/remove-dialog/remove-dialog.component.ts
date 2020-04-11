import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.less']
})
export class RemoveDialogComponent implements OnInit {

  @Output() remove = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<RemoveDialogComponent>) {
  }

  ngOnInit(): void {
  }

  public noClick() {
    this.dialogRef.close();
  }

  public removeEvent() {
    this.remove.emit();
    this.dialogRef.close();
  }
}
