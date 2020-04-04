import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Applicant} from '../../models/applicant';

@Component({
  selector: 'app-applicant-item',
  templateUrl: './applicant-item.component.html',
  styleUrls: ['./applicant-item.component.less']
})
export class ApplicantItemComponent implements OnInit, OnChanges {

  @Input() public applicant: Applicant;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.applicant.currentValue) {
      this.applicant = changes.applicant.currentValue;
    }
  }

}
