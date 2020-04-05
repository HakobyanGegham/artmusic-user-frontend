import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.less']
})
export class LeftPanelComponent implements OnInit {
  @ViewChild('applicationItem') applicationItem: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  showHideOptions() {
    this.applicationItem.nativeElement.querySelector('.f_festival-list').classList.toggle('is-hidden');
    this.applicationItem.nativeElement.querySelector('.f_rotate-icon').classList.toggle('rotate');
  }
}
