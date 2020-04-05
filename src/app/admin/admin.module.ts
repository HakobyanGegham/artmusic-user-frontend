import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import {MatIconModule} from '@angular/material/icon';
import { CountriesComponent } from './countries/countries.component';
import { CountryComponent } from './country/country.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UpdateDialogComponent } from './modals/update-dialog/update-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { RegionsComponent } from './regions/regions.component';
import { RegionComponent } from './region/region.component';
import { CitiesComponent } from './cities/cities.component';
import { CityComponent } from './city/city.component';


@NgModule({
  declarations: [AdminComponent, LeftPanelComponent, CountriesComponent, CountryComponent, UpdateDialogComponent, RegionsComponent, RegionComponent, CitiesComponent, CityComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    NgxPaginationModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class AdminModule { }
