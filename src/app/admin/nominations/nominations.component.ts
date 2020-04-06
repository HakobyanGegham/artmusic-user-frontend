import { Component, OnInit } from '@angular/core';
import {Nomination} from '../../models/nomination';
import {ApplicationService} from '../../services/application.service';

@Component({
  selector: 'app-nominations',
  templateUrl: './nominations.component.html',
  styleUrls: ['./nominations.component.less']
})
export class NominationsComponent implements OnInit {
  public p: number;
  public nominations: Nomination[];

  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.applicationService.getNominations().subscribe(nominations => {
      this.nominations = nominations;
    });
  }

}
