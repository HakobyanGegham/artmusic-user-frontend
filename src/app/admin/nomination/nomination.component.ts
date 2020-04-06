import {Component, Inject, Input, LOCALE_ID, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Nomination} from '../../models/nomination';
import {UpdateDialogComponent} from '../modals/update-dialog/update-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ApplicationService} from '../../services/application.service';

@Component({
  selector: 'app-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.less']
})
export class NominationComponent implements OnInit, OnChanges {

  @Input() public nomination: Nomination;

  constructor(@Inject(LOCALE_ID) public locale: string,
              private dialog: MatDialog,
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
    const dialog = this.dialog.open(UpdateDialogComponent, {
      width: '450px',
      height: '300px',
      data: {
        dataKey: data
      }
    });

    dialog.componentInstance.OnSubmitClick.subscribe(value => {
      this.applicationService.updateNomination(+this.nomination.id, value.names).subscribe(nomination => {
        this.nomination = nomination;
      });
    });
  }

  public removeItem() {
  }
}

