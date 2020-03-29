import {Component, OnInit} from '@angular/core';
import {Festival} from '../../models/festival';
import {FestivalService} from '../../services/festival.service';
import {ApplicationService} from '../../services/application.service';

@Component({
  selector: 'app-user-left-panel',
  templateUrl: './user-left-panel.component.html',
  styleUrls: ['./user-left-panel.component.less']
})
export class UserLeftPanelComponent implements OnInit {

  public festivals: Festival[];

  constructor(private festivalService: FestivalService,
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
