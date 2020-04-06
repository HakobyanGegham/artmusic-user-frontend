import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {CountriesComponent} from './countries/countries.component';
import {RegionsComponent} from './regions/regions.component';
import {CitiesComponent} from './cities/cities.component';
import {InstitutionsComponent} from './institutions/institutions.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
