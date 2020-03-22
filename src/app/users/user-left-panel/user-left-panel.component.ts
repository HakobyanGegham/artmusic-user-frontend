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

  showHideOptions(currentTarget: EventTarget) {
    console.log(currentTarget);
    // const itemContainer = currentTarget.closest('.f_item');
    // itemContainer.querySelector('.f_festival-list').classList.toggle('is-hidden');
    // itemContainer.querySelector('.f_rotate-icon').classList.toggle('rotate');
  }
}
