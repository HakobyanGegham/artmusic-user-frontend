import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ApplicationService} from '../../services/application.service';
import {Application} from '../../models/application';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import {FormFilter} from '../../models/form-filter';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.less']
})
export class ApplicationsComponent implements OnInit {

  public applications: Application[];
  public p = 1;
  public filteredItems: Observable<any[]>;
  public isAdmin: boolean;

  constructor(private applicationService: ApplicationService,
              private route: ActivatedRoute,
              @Inject(LOCALE_ID) public locale: string) {
  }

  public ngOnInit(): void {
    const festivalId = this.route.snapshot.paramMap.get('festivalId');
    const isAdminQueryParam = this.route.snapshot.queryParamMap.get('isAdmin');

    this.isAdmin = isAdminQueryParam === 'true';

    this.applicationService.getApplications(+festivalId).subscribe(applications => {
      this.applications = applications;
      this.filteredItems = of(applications);
    });
  }

  private filter(data: FormFilter) {
    this.filteredItems = of(this.applications.filter(application => {
      return +application.applicant.age > data.ageFrom &&
        +application.applicant.age < data.ageTo &&
        application.nomination.names[this.locale].toLowerCase().indexOf(data.nomination.toLowerCase()) !== -1 &&
        application.specialization.names[this.locale].toLowerCase().indexOf(data.specialization.toLowerCase()) !== -1 &&
        application.institution.names[this.locale].toLowerCase().indexOf(data.institution.toLowerCase()) !== -1;
    }));
  }

  public removeItem(id: any) {
    this.applicationService.removeApplication(id).subscribe(message => {
      this.applications = this.applications.filter(application => {
        return application.id !== id;
      });
    });
  }
}
