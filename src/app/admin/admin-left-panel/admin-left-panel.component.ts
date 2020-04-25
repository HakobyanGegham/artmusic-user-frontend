import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-admin-left-panel',
  templateUrl: './admin-left-panel.component.html',
  styleUrls: ['./admin-left-panel.component.less']
})
export class AdminLeftPanelComponent implements OnInit {
  @ViewChild('applicationItem') applicationItem: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  showHideOptions() {
    this.applicationItem.nativeElement.querySelector('.f_festival-list').classList.toggle('is-hidden');
    this.applicationItem.nativeElement.querySelector('.f_rotate-icon').classList.toggle('rotate');
  }
}
