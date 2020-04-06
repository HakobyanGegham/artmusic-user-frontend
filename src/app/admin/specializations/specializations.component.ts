import {Component, OnInit} from '@angular/core';
import {Specialization} from '../../models/specialization';
import {Nomination} from '../../models/nomination';
import {ApplicationService} from '../../services/application.service';

@Component({
  selector: 'app-specializations',
  templateUrl: './specializations.component.html',
  styleUrls: ['./specializations.component.less']
})
export class SpecializationsComponent implements OnInit {
  public p: number;
  public specializations: Specialization[];
  public nominations: Nomination[];

  constructor(private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
    this.applicationService.getNominations().subscribe(nominations => {
      this.nominations = nominations;
    });

    this.applicationService.getSpecializations().subscribe(specializations => {
      this.specializations = specializations;
    });
  }

}
