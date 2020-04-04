import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '../../services/application.service';
import {Application} from '../../models/application';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.less']
})
export class ApplicationsComponent implements OnInit {

  public applications: Application[];
  public p = 1;
  public filterForm: FormGroup;
  public filteredItems: Observable<any[]>;

  constructor(private applicationService: ApplicationService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    const festivalId = this.route.snapshot.paramMap.get('festivalId');

    this.applicationService.getApplications(+festivalId).subscribe(applications => {
      this.applications = applications;
      this.filteredItems = this.filterForm.get('nomination').valueChanges.pipe(
        startWith(''),
        map(val => this.filter(val))
      );
    });

    this.initForm();
  }

  private filter(val: any) {
    return this.applications.filter(application => {
      return application.nomination.name.toLowerCase().indexOf(val.toLowerCase()) === 0;
    });
  }

  private initForm() {
    this.filterForm = this.formBuilder.group({
      nomination: ['']
    });
  }

  public removeItem(id: any) {
    this.applicationService.removeApplication(id).subscribe(message => {
      this.applications = this.applications.filter(application => {
        return application.id !== id;
      });
    });
  }
}
