import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Application} from '../../models/application';
import {MatDialog} from '@angular/material/dialog';
import {RemoveApplicationDialogComponent} from '../../components/modals/remove-application-dialog/remove-application-dialog.component';
import {ApplicationService} from '../../services/application.service';

@Component({
  selector: 'app-application-item',
  templateUrl: './application-item.component.html',
  styleUrls: ['./application-item.component.less']
})
export class ApplicationItemComponent implements OnInit, OnChanges {

  @Input() application: Application;
  @Output() onRemove = new EventEmitter();

  constructor(private dialog: MatDialog,
              private applicationService: ApplicationService,
              @Inject(LOCALE_ID) public locale: string) {
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.application.currentValue) {
      this.application = changes.application.currentValue;
    }
  }

  public removeItem() {
    const dialogRef = this.dialog.open(RemoveApplicationDialogComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.remove.subscribe(() => {
      this.onRemove.emit(this.application.id);
      dialogRef.close();
    });
  }
}
