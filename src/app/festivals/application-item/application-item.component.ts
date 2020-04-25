import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Application} from '../../models/application';
import {MatDialog} from '@angular/material/dialog';
import {RemoveApplicationDialogComponent} from '../../components/modals/remove-application-dialog/remove-application-dialog.component';
import {ApplicationService} from '../../services/application.service';
import {ActivatedRoute} from '@angular/router';
import {SuccessDialogService} from '../../services/success-dialog.service';


@Component({
  selector: 'app-application-item',
  templateUrl: './application-item.component.html',
  styleUrls: ['./application-item.component.less']
})
export class ApplicationItemComponent implements OnInit, OnChanges {

  @Input() application: Application;
  @Output() remove = new EventEmitter();
  public isAdmin: boolean;

  constructor(private dialog: MatDialog,
              @Inject(LOCALE_ID) public locale: string,
              private applicationService: ApplicationService,
              private successDialogService: SuccessDialogService,
              private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    const isAdminQueryParam = this.route.snapshot.queryParamMap.get('isAdmin');
    this.isAdmin = isAdminQueryParam === 'true';
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
      this.remove.emit(this.application.id);
      dialogRef.close();
    });
  }

  public rejectItem() {
    this.applicationService.rejectApplication(this.application.id).subscribe(message => {
      this.successDialogService.showMessage(message);
    });
  }

  public acceptItem() {
    this.applicationService.acceptApplication(this.application.id).subscribe(message => {
      this.successDialogService.showMessage(message);
    });
  }
}
