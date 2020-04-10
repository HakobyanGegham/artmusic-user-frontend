import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Nomination} from '../../models/nomination';
import {UpdateDialogComponent} from '../modals/update-dialog/update-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ApplicationService} from '../../services/application.service';
import {Subscription} from 'rxjs';
import {RemoveDialogComponent} from '../modals/remove-dialog/remove-dialog.component';

@Component({
  selector: 'app-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.less']
})
export class NominationComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public nomination: Nomination;
  @Output() public removed = new EventEmitter();

  private subscription = new Subscription();

  constructor(@Inject(LOCALE_ID) public locale: string,
              private updateDialog: MatDialog,
              private removeDialog: MatDialog,
              private applicationService: ApplicationService) {
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.nomination.currentValue) {
      this.nomination = changes.nomination.currentValue;
    }
  }

  public openDialog() {
    const data = {
      item: this.nomination
    };
    const updateDialog = this.updateDialog.open(UpdateDialogComponent, {
      width: '450px',
      height: '300px',
      data: {
        dataKey: data
      }
    });

    const updateSubscription = updateDialog.componentInstance.OnSubmitClick.subscribe(value => {
      this.applicationService.updateNomination(+this.nomination.id, value.names).subscribe(nomination => {
        this.nomination = nomination;
      });
    });

    this.subscription.add(updateSubscription);
  }

  public removeItem() {
    const removeDialog = this.removeDialog.open(RemoveDialogComponent, {
      width: '350px',
      height: '200px',
    });

    const removeSubscription = removeDialog.componentInstance.remove.subscribe(() => {
      this.applicationService.removeNomination(+this.nomination.id).subscribe(() => {
        this.removed.emit(+this.nomination.id);
      });
    });

    this.subscription.add(removeSubscription);
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

