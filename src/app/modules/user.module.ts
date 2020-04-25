import {NgModule} from '@angular/core';

import {UsersRoutingModule} from './users-routing.module';
import {FestivalContentComponent} from '../users/festival-content/festival-content.component';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    FestivalContentComponent,
  ],
  imports: [
    UsersRoutingModule,
    SharedModule
  ]
})
export class UserModule {
}
