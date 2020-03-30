import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-remove-application-dialog',
  templateUrl: './remove-application-dialog.component.html',
  styleUrls: ['./remove-application-dialog.component.less']
})
export class RemoveApplicationDialogComponent implements OnInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onRemove = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<RemoveApplicationDialogComponent>,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  public onNoClick() {
    this.dialogRef.close();
  }

  public removeEvent() {
    this.onRemove.emit();
  }
}
