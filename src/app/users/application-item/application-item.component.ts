import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Application} from '../../models/application';

@Component({
  selector: 'app-application-item',
  templateUrl: './application-item.component.html',
  styleUrls: ['./application-item.component.less']
})
export class ApplicationItemComponent implements OnInit, OnChanges {

  @Input() application: Application;

  constructor() {
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.application.currentValue) {
      this.application = changes.application.currentValue;
    }
  }

  public removeItem() {

  }
}
