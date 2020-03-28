import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import FormHelper from '../../helpers/form-helper';
import {ApplicationService} from '../../services/application.service';
import {Country} from '../../models/country';
import {City} from '../../models/city';
import {Region} from '../../models/region';
import {Institution} from '../../models/institution';
import {Nomination} from '../../models/nomination';
import {Specialization} from '../../models/specialization';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
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
      country: ['', [Validators.required]],
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

  public regionChange(event: MatAutocompleteSelectedEvent) {
    const id = event.option._getHostElement().getAttribute('data-id');
    this.cityService.getCities(+id).subscribe(cities => {
      this.cities = cities;
    });
  }

  public cityChange(event: MatAutocompleteSelectedEvent) {
    const id = event.option._getHostElement().getAttribute('data-id');
    this.institutionService.getEducationalInstitutions(+id).subscribe(institutions => {
      this.institutions = institutions;
    });
  }

  public nominationChange(value: any) {
    this.applicationService.getSpecializations(+value).subscribe(specializations => {
      this.specializations = specializations;
    });
  }

  public countryChange(event: any) {
    const id = event.option._getHostElement().getAttribute('data-id');
    this.regionService.getRegions(+id).subscribe(regions => {
      this.regions = regions;
    });
  }

  addRegion(event: MouseEvent, regionInput: HTMLInputElement, value: string) {
    event.stopPropagation();
    event.preventDefault();
    if (regionInput.value.trim() !== '') {
      const selectedCountry = this.countries.find(country => {
        return country.name === value;
      });

      this.regionService.addRegions(regionInput.value, selectedCountry.id).subscribe(region => {
        this.regions.push(region);
      });
    }
  }

  addCity(event: MouseEvent, cityInput: HTMLInputElement, value: string) {
    event.stopPropagation();
    event.preventDefault();
    if (cityInput.value.trim() !== '') {
      const selectedRegion = this.regions.find(region => {
        return region.name === value;
      });

      this.cityService.addCity(cityInput.value, selectedRegion.id).subscribe(city => {
        this.cities.push(city);
      });
    }
  }

  addEducationalInstitution(event: MouseEvent, institutionInput: HTMLInputElement, value: string) {
    event.stopPropagation();
    event.preventDefault();
    if (institutionInput.value.trim() !== '') {
      const selectedCity = this.cities.find(city => {
        return city.name === value;
      });

      this.institutionService.addEducationalInstitution(institutionInput.value, selectedCity.id)
        .subscribe(institution => {
          this.institutions.push(institution);
        });
    }
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

  addCountry(event: {}) {
    console.log(event);
    // event.stopPropagation();
    // event.preventDefault();
    // if (countryInput.value.trim() !== '') {
    //   this.countryService.addCountry(countryInput.value).subscribe(country => {
    //     this.countries.push(country);
    //   });
    // }
  }
}
