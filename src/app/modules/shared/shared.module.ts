import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {LeftPanelComponent} from '../../components/left-panel/left-panel.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {UploadPercentageDirective} from '../../directives/upload-percentage.directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {RouterModule} from '@angular/router';
import {ErrorDialogComponent} from '../../components/modals/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    LeftPanelComponent,
    UploadPercentageDirective,
    ErrorDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    FontAwesomeModule,
    MatAutocompleteModule,
    LeftPanelComponent,
    UploadPercentageDirective,
    ErrorDialogComponent
  ],
})
export class SharedModule {
}
