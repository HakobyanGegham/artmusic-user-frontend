import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormFilter} from '../../models/form-filter';
import {MatSelect} from '@angular/material/select';
import {ApplicationService} from '../../services/application.service';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.less']
})
export class FilterFormComponent implements OnInit {
  public filterForm: FormGroup;
  public ages = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  private formFilter = new FormFilter();
  @ViewChild('nominationInput') nominationInput: ElementRef;
  @ViewChild('specializationInput') specializationInput: ElementRef;
  @ViewChild('institutionInput') institutionInput: ElementRef;
  @ViewChild('ageFromInput') ageFromInput: MatSelect;
  @ViewChild('ageToInput') ageToInput: MatSelect;

  @Output() inputChange = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initInputEvents();
  }

  private initForm() {
    this.filterForm = this.formBuilder.group({
      nomination: [''],
      specialization: [''],
      institution: [''],
      ageFrom: [''],
      ageTo: [''],
    });
  }

  private initInputEvents() {
    this.filterForm.get('nomination').valueChanges.subscribe(() => {
      this.setFormFilter();
      this.inputChange.emit(this.formFilter);
    });
    this.filterForm.get('specialization').valueChanges.subscribe(() => {
      this.setFormFilter();
      this.inputChange.emit(this.formFilter);
    });
    this.filterForm.get('institution').valueChanges.subscribe(() => {
      this.setFormFilter();
      this.inputChange.emit(this.formFilter);
    });
    this.filterForm.get('ageFrom').valueChanges.subscribe(() => {
      this.setFormFilter();
      this.inputChange.emit(this.formFilter);
    });
    this.filterForm.get('ageTo').valueChanges.subscribe(() => {
      this.setFormFilter();
      this.inputChange.emit(this.formFilter);
    });
  }

  private setFormFilter() {
    this.formFilter.ageFrom = this.ageFromInput.value ? +this.ageFromInput.value : 0;
    this.formFilter.ageTo = this.ageToInput.value ? +this.ageToInput.value : 100;
    this.formFilter.nomination = this.nominationInput.nativeElement.value ?? '';
    this.formFilter.specialization = this.specializationInput.nativeElement.value ?? '';
    this.formFilter.institution = this.institutionInput.nativeElement.value ?? '';
  }

  public download() {
    this.applicationService.downloadApplication(this.formFilter).subscribe(data => {
      debugger
      const blob = new Blob([data], {type: 'text/csv'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
