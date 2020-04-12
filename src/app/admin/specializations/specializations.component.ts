import {Component, OnDestroy, OnInit} from '@angular/core';
import {Specialization} from '../../models/specialization';
import {Nomination} from '../../models/nomination';
import {ApplicationService} from '../../services/application.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AddDialogComponent} from '../modals/add-dialog/add-dialog.component';

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

  constructor(private applicationService: ApplicationService,
              private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.applicationService.getNominations().subscribe(nominations => {
      this.nominations = nominations;
    });

    this.applicationService.getSpecializations().subscribe(specializations => {
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
      this.applicationService.updateSpecialization(value, 1).subscribe(specialization => {
        this.specializations.push(specialization);
      });
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
