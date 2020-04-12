import {Component, OnDestroy, OnInit} from '@angular/core';
import {Nomination} from '../../models/nomination';
import {ApplicationService} from '../../services/application.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AddDialogComponent} from '../modals/add-dialog/add-dialog.component';
import {NominationService} from '../../services/nomination.service';

@Component({
  selector: 'app-nominations',
  templateUrl: './nominations.component.html',
  styleUrls: ['./nominations.component.less']
})
export class NominationsComponent implements OnInit, OnDestroy {
  public p: number;
  public nominations: Nomination[];
  private subscription = new Subscription();

  constructor(private nominationService: NominationService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.nominationService.getNominations().subscribe(nominations => {
      this.nominations = nominations;
    });
  }

  removeNomination(removedNominationId: any) {
    this.nominations = this.nominations.filter(nomination => {
      return nomination !== removedNominationId;
    });
  }

  public addNomination() {
    const addDialog = this.dialog.open(AddDialogComponent, {
      width: '450px',
      height: '320px',
      data: {
        dataKey: {}
      }
    });

    this.subscription = addDialog.componentInstance.OnSubmitClick.subscribe((value) => {
      const data = {
        parentItem: value.parentItem,
        names: value.names,
      };
      this.nominationService.updateNomination(value, 1).subscribe(nomination => {
        this.nominations.push(nomination);
      });
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
