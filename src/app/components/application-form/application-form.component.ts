import {Component, Inject, Input, LOCALE_ID, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import FormHelper from '../../helpers/form-helper';
import {ApplicationService} from '../../services/application.service';
import {Country} from '../../models/country';
import {City} from '../../models/city';
import {Region} from '../../models/region';
import {Institution} from '../../models/institution';
import {Nomination} from '../../models/nomination';
import {Specialization} from '../../models/specialization';
import {CountryService} from '../../services/country.service';
import {RegionService} from '../../services/region.service';
import {CityService} from '../../services/city.service';
import {InstitutionService} from '../../services/institution.service';
import {Application} from '../../models/application';
import {ActivatedRoute} from '@angular/router';
import {NominationService} from '../../services/nomination.service';
import {SpecializationService} from '../../services/specialization.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.less']
})

export class ApplicationFormComponent extends FormHelper implements OnInit, OnChanges {

  @Input() public application: Application;

  public countries: Country[];
  public regions: Region[];
  public cities: City[];
  public institutions: Institution[];
  public nominations: Nomination[];
  public specializations: Specialization[];

  private selectedCountryId: number;
  private selectedRegionId: number;
  private selectedCityId: number;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private applicationService: ApplicationService,
              private countryService: CountryService,
              private regionService: RegionService,
              private cityService: CityService,
              private institutionService: InstitutionService,
              private nominationService: NominationService,
              private specializationService: SpecializationService,
              @Inject(LOCALE_ID) public locale: string) {
    super();
  }

  public ngOnInit(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
    this.nominationService.getNominations().subscribe(nominations => {
      this.nominations = nominations;
    });
    this.initForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.application.currentValue) {
      this.application = changes.application.currentValue;
      this.setFormInitialValues();
    }
  }

  private initForm() {
    this.form = this.formBuilder.group({
      country: new FormControl('', [Validators.required]),
      region: ['', [Validators.required]],
      city: ['', [Validators.required]],
      institution: ['', [Validators.required]],
      nomination: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      directorFirstName: ['', [Validators.required, Validators.minLength(3)]],
      directorLastName: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  private setFormInitialValues() {
    this.getFormControl('country').setValue(this.application.country.names[this.locale]);
    this.getFormControl('directorFirstName').setValue(this.application.directorFirstName);
    this.getFormControl('directorLastName').setValue(this.application.directorLastName);
    this.regionService.getRegions(+this.application.country.id).subscribe(regions => {
      this.regions = regions;
      this.getFormControl('region').setValue(this.application.region.names[this.locale]);
    });
    this.cityService.getCities(this.application.region.id).subscribe(cities => {
      this.cities = cities;
      this.getFormControl('city').setValue(this.application.city.names[this.locale]);
    });
    this.institutionService.getInstitutions(this.application.city.id).subscribe(institutions => {
      this.institutions = institutions;
      this.getFormControl('institution').setValue(this.application.institution.names[this.locale]);
    });
    this.nominationService.getNominations().subscribe(nominations => {
      this.nominations = nominations;
      this.getFormControl('nomination').setValue(this.application.nomination.names[this.locale]);
    });
    this.specializationService.getSpecializations(this.application.nomination.id).subscribe(specializations => {
      this.specializations = specializations;
      this.getFormControl('specialization').setValue(this.application.specialization.names[this.locale]);
    });
  }

  public submit() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      return this.getFromFormValues();
    } else {
      this.validateAllFormFields(this.form);
      return false;
    }
  }

  public countryChange(countryId: any) {
    this.selectedCountryId = +countryId;
    this.regionService.getRegions(+countryId).subscribe(regions => {
      this.regions = regions;
    });
  }

  public regionChange(regionId: any) {
    this.selectedRegionId = +regionId;
    this.cityService.getCities(+regionId).subscribe(cities => {
      this.cities = cities;
    });
  }

  public cityChange(cityId: any) {
    this.selectedCityId = +cityId;
    this.institutionService.getInstitutions(+cityId).subscribe(institutions => {
      this.institutions = institutions;
    });
  }

  public nominationChange(nominationId: any) {
    this.specializationService.getSpecializations(+nominationId).subscribe(specializations => {
      this.specializations = specializations;
    });
  }

  public addCountry(newCountry: any) {
    this.countryService.addItem(newCountry).subscribe(country => {
      this.countries.push(country);
      this.selectedCountryId = country.id;
      this.countryChange(country.id);
    });
  }

  public addRegion(value: any) {
    this.regionService.addItem(value, this.selectedCountryId).subscribe(region => {
      this.regions.push(region);
      this.selectedRegionId = region.id;
      this.regionChange(region.id);
    });
  }

  public addCity(value: string) {
    this.cityService.addItem(value, this.selectedRegionId).subscribe(city => {
      this.cities.push(city);
      this.selectedCityId = city.id;
      this.cityChange(city.id);
    });
  }

  public addInstitution(value: string) {
    this.institutionService.addItem(value, this.selectedCityId).subscribe(institution => {
      this.institutions.push(institution);
    });
  }

  private getFromFormValues() {
    const country = this.countries.find(item => {
      return item.names[this.locale] === this.form.value.country;
    });
    const region = this.regions.find(item => {
      return item.names[this.locale] === this.form.value.region;
    });
    const city = this.cities.find(item => {
      return item.names[this.locale] === this.form.value.city;
    });
    const institution = this.institutions.find(item => {
      return item.names[this.locale] === this.form.value.institution;
    });
    const id = this.route.snapshot.paramMap.get('applicationId');
    return {
      id: id ? +id : null,
      country: country.id,
      region: region.id,
      city: city.id,
      institution: institution.id,
      nomination: +this.form.value.nomination,
      specialization: +this.form.value.specialization,
      directorFirstName: this.form.value.directorFirstName,
      directorLastName: this.form.value.directorLastName,
    };
  }

  public emptyRegions() {
    this.regions = [];
  }

  public emptyCities() {
    this.cities = [];
  }

  public emptyInstitutions() {
    this.institutions = [];
  }
}
