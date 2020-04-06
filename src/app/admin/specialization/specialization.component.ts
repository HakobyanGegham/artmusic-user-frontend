import {Component, Inject, Input, LOCALE_ID, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Specialization} from '../../models/specialization';
import {Nomination} from '../../models/nomination';
import {UpdateDialogComponent} from '../modals/update-dialog/update-dialog.component';
import {ApplicationService} from '../../services/application.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.less']
})
export class SpecializationComponent implements OnInit, OnChanges {

  @Input() public specialization: Specialization;
  @Input() public nominations: Nomination[];

  public nomination: Nomination;

  constructor(@Inject(LOCALE_ID) public locale: string,
              private dialog: MatDialog,
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
    const dialog = this.dialog.open(UpdateDialogComponent, {
      width: '450px',
      height: '360px',
      data: {
        dataKey: dialogData
      }
    });

    dialog.componentInstance.OnSubmitClick.subscribe((value) => {
      const data = {
        parentItem: value.parentItem,
        names: value.names,
      };
      this.applicationService.updateSpecialization(+this.specialization.id, data).subscribe(specialization => {
        this.specialization = specialization;
      });
    });
  }

  public removeItem() {

  }

}
