import {NgModule} from '@angular/core';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from '../admin/admin.component';
import {AdminLeftPanelComponent} from '../admin/admin-left-panel/admin-left-panel.component';
import {CountriesComponent} from '../admin/countries/countries.component';
import {CountryComponent} from '../admin/country/country.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {UpdateDialogComponent} from '../admin/modals/update-dialog/update-dialog.component';
import {RegionsComponent} from '../admin/regions/regions.component';
import {RegionComponent} from '../admin/region/region.component';
import {CitiesComponent} from '../admin/cities/cities.component';
import {CityComponent} from '../admin/city/city.component';
import {InstitutionsComponent} from '../admin/institutions/institutions.component';
import {InstitutionComponent} from '../admin/institution/institution.component';
import {NominationComponent} from '../admin/nomination/nomination.component';
import {NominationsComponent} from '../admin/nominations/nominations.component';
import {SpecializationsComponent} from '../admin/specializations/specializations.component';
import {SpecializationComponent} from '../admin/specialization/specialization.component';
import {RemoveDialogComponent} from '../admin/modals/remove-dialog/remove-dialog.component';
import {AddDialogComponent} from '../admin/modals/add-dialog/add-dialog.component';
import {FestivalsComponent} from '../admin/festivals/festivals.component';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminLeftPanelComponent,
    CountriesComponent,
    CountryComponent,
    UpdateDialogComponent,
    RegionsComponent,
    RegionComponent,
    CitiesComponent,
    CityComponent,
    InstitutionsComponent,
    InstitutionComponent,
    NominationComponent,
    NominationsComponent,
    SpecializationsComponent,
    SpecializationComponent,
    RemoveDialogComponent,
    AddDialogComponent,
    FestivalsComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule {
}
