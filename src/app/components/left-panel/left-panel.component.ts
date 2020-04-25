import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Festival} from '../../models/festival';
import {FestivalService} from '../../services/festival.service';
import {ApplicationService} from '../../services/application.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.less']
})
export class LeftPanelComponent implements OnInit {

  public festivals: Festival[];

  constructor(private festivalService: FestivalService,
              @Inject(LOCALE_ID) public locale: string,
              private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
    this.festivalService.getFestivals().subscribe(festivals => {
      this.festivals = festivals;
    });
  }

  public showHideOptions(currentTarget: any) {
    const itemContainer = currentTarget.closest('.f_item');
    itemContainer.querySelector('.f_festival-list').classList.toggle('is-hidden');
    itemContainer.querySelector('.f_rotate-icon').classList.toggle('rotate');
  }
}
