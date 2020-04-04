import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ApplicantService} from '../../services/applicant.service';
import {Applicant} from '../../models/applicant';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.less']
})
export class ApplicantsComponent implements OnInit {

  public applicants: Applicant[];
  public p = 1;
  public filterForm: FormGroup;
  public filteredItems: Observable<any>;

  constructor(private applicantService: ApplicantService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.applicantService.getApplicants().subscribe(applicants => {
      this.applicants = applicants;
      this.filteredItems = this.filterForm.get('firstName').valueChanges.pipe(
        startWith(''),
        map(val => this.filter(val))
      );
    });
  }

  private filter(val: any) {
    return this.applicants.filter(applicant => {
      return applicant.firstName.toLowerCase().indexOf(val.toLowerCase()) === 0;
    });
  }

  private initForm() {
    this.filterForm = this.formBuilder.group({
      firstName: ['']
    });
  }
}
