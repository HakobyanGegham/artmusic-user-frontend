import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from '../admin/admin.component';
import {CountriesComponent} from '../admin/countries/countries.component';
import {RegionsComponent} from '../admin/regions/regions.component';
import {CitiesComponent} from '../admin/cities/cities.component';
import {InstitutionsComponent} from '../admin/institutions/institutions.component';
import {NominationsComponent} from '../admin/nominations/nominations.component';
import {SpecializationsComponent} from '../admin/specializations/specializations.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {FestivalsComponent} from '../admin/festivals/festivals.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'countries',
        component: CountriesComponent
      },
      {
        path: 'regions',
        component: RegionsComponent
      },
      {
        path: 'cities',
        component: CitiesComponent
      },
      {
        path: 'institutions',
        component: InstitutionsComponent
      },
      {
        path: 'nominations',
        component: NominationsComponent
      },
      {
        path: 'specializations',
        component: SpecializationsComponent
      }
    ]
  },
  {
    path: 'festivals',
    component: FestivalsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
