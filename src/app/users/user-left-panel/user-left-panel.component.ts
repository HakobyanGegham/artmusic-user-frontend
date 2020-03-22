import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-left-panel',
  templateUrl: './user-left-panel.component.html',
  styleUrls: ['./user-left-panel.component.less']
})
export class UserLeftPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showHideOptions(target: EventTarget) {
    const itemContainer = target.closest('.f_item');
    itemContainer.querySelector('.f_festival-list').classList.toggle('is-hidden');
    itemContainer.querySelector('.f_rotate-icon').classList.toggle('rotate');
  }
}
