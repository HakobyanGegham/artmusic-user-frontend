import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '../../services/application.service';
import {Application} from '../../models/application';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.less']
})
export class ApplicationsComponent implements OnInit {

  public applications: Application[];

  constructor(private applicationService: ApplicationService,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const festivalId = this.route.snapshot.paramMap.get('festivalId');

    this.applicationService.getApplications(+festivalId).subscribe(applications => {
      this.applications = applications;
    });
  }

}
