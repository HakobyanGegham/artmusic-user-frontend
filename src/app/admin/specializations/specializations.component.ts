import {Component, OnDestroy, OnInit} from '@angular/core';
import {Specialization} from '../../models/specialization';
import {Nomination} from '../../models/nomination';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AddDialogComponent} from '../modals/add-dialog/add-dialog.component';
import {SpecializationService} from '../../services/specialization.service';
import {NominationService} from '../../services/nomination.service';

@Component({
  selector: 'app-specializations',
  templateUrl: './specializations.component.html',
  styleUrls: ['./specializations.component.less']
})
export class SpecializationsComponent implements OnInit, OnDestroy {
  public p: number;
  public specializations: Specialization[];
  public nominations: Nomination[];
  private subscription = new Subscription();

  constructor(private specializationService: SpecializationService,
              private nominationService: NominationService,
              private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.nominationService.getNominations().subscribe(nominations => {
      this.nominations = nominations;
    });

    this.specializationService.getSpecializations().subscribe(specializations => {
      this.specializations = specializations;
    });
  }

  public removeSpecialization(removedSpecializationId: any) {
    this.specializations = this.specializations.filter(specialization => {
      return specialization.id !== removedSpecializationId;
    });
  }

  public addSpecialization() {
    const addDialog = this.dialog.open(AddDialogComponent, {
      width: '450px',
      height: '360px',
      data: {
        dataKey: {
          parentItem: this.nominations,
        }
      }
    });

    this.subscription = addDialog.componentInstance.OnSubmitClick.subscribe((value) => {
      const data = {
        parentItem: value.parentItem,
        names: value.names,
      };
      this.specializationService.updateSpecialization(value, 1).subscribe(specialization => {
        this.specializations.push(specialization);
      });
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
