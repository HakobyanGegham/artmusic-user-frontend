import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { FestivalContentComponent } from './festival-content/festival-content.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationItemComponent } from './application-item/application-item.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [FestivalContentComponent, ApplicationsComponent, ApplicationItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class UsersModule { }
