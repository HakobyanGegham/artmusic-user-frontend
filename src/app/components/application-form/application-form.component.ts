import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.less']
})

export class ApplicationFormComponent extends FormHelper implements OnInit {

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
              private applicationService: ApplicationService,
              private countryService: CountryService,
              private regionService: RegionService,
              private cityService: CityService,
              private institutionService: InstitutionService) {
    super();
  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
    this.applicationService.getNominations().subscribe(nominations => {
      this.nominations = nominations;
    });
    this.initForm();
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

  public submit() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      this.setFormValues();
      return this.form.value;
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
    this.institutionService.getEducationalInstitutions(+cityId).subscribe(institutions => {
      this.institutions = institutions;
    });
  }

  public nominationChange(nominationId: any) {
    this.applicationService.getSpecializations(+nominationId).subscribe(specializations => {
      this.specializations = specializations;
    });
  }

  public addCountry(newCountry: any) {
    this.countryService.addCountry(newCountry).subscribe(country => {
      this.countries.push(country);
      this.selectedCountryId = country.id;
      this.countryChange(country.id);
    });
  }

  public addRegion(value: any) {
    this.regionService.addRegions(value, this.selectedCountryId).subscribe(region => {
      this.regions.push(region);
      this.selectedRegionId = region.id;
      this.regionChange(region.id);
    });
  }

  public addCity(value: string) {
    this.cityService.addCity(value, this.selectedRegionId).subscribe(city => {
      this.cities.push(city);
      this.selectedCityId = city.id;
      this.cityChange(city.id);
    });
  }

  public addInstitution(value: string) {
    this.institutionService.addEducationalInstitution(value, this.selectedCityId).subscribe(institution => {
      this.institutions.push(institution);
    });
  }

  private setFormValues() {
    const country = this.countries.find(item => {
      return item.name === this.form.value.country;
    });
    const region = this.regions.find(item => {
      return item.name === this.form.value.region;
    });
    const city = this.cities.find(item => {
      return item.name === this.form.value.city;
    });
    const institution = this.institutions.find(item => {
      return item.name === this.form.value.institution;
    });

    this.form.value.country = country.id;
    this.form.value.region = region.id;
    this.form.value.city = city.id;
    this.form.value.institution = institution.id;
    this.form.value.nomination = +this.form.value.nomination;
    this.form.value.specialization = +this.form.value.specialization;
  }
}
