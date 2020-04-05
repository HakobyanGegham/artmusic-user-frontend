import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import {MatIconModule} from '@angular/material/icon';
import { CountriesComponent } from './countries/countries.component';


@NgModule({
  declarations: [AdminComponent, LeftPanelComponent, CountriesComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule
  ]
})
export class AdminModule { }
