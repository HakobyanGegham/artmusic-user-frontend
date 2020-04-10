import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Specialization} from '../../models/specialization';
import {Nomination} from '../../models/nomination';
import {UpdateDialogComponent} from '../modals/update-dialog/update-dialog.component';
import {ApplicationService} from '../../services/application.service';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {RemoveDialogComponent} from '../modals/remove-dialog/remove-dialog.component';

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.less']
})
export class SpecializationComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public specialization: Specialization;
  @Input() public nominations: Nomination[];
  @Output() removed = new EventEmitter();

  public nomination: Nomination;
  public subscription = new Subscription();

  constructor(@Inject(LOCALE_ID) public locale: string,
              private updateDialog: MatDialog,
              private removeDialog: MatDialog,
              private applicationService: ApplicationService) {
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.specialization.currentValue) {
      this.specialization = changes.specialization.currentValue;
    }

    if (changes.nominations.currentValue) {
      this.nominations = changes.nominations.currentValue;
      this.nomination = this.nominations.find(city => {
        return city.id === this.specialization.nominationId;
      });
    }
  }

  public openDialog() {
    const dialogData = {
      item: this.specialization,
      parentItem: this.nominations,
      parentId: 'nominationId',
    };
    const updateDialog = this.updateDialog.open(UpdateDialogComponent, {
      width: '450px',
      height: '360px',
      data: {
        dataKey: dialogData
      }
    });

    const updateSubscription = updateDialog.componentInstance.OnSubmitClick.subscribe((value) => {
      const data = {
        parentItem: value.parentItem,
        names: value.names,
      };
      this.applicationService.updateSpecialization(+this.specialization.id, data).subscribe(specialization => {
        this.specialization = specialization;
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
      this.applicationService.removeSpecialization(+this.specialization.id).subscribe(() => {
        this.removed.emit(+this.specialization.id);
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
