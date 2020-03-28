import {Component, OnInit} from '@angular/core';
import {ApplicationForm} from '../../models/application-form';
import {ApplicationService} from '../../services/application.service';
import {Festival} from '../../models/festival';
import {FestivalService} from '../../services/festival.service';

@Component({
  selector: 'app-user-left-panel',
  templateUrl: './user-left-panel.component.html',
  styleUrls: ['./user-left-panel.component.less']
})
export class UserLeftPanelComponent implements OnInit {

  public festivalList = ['Applications', 'Applicants', 'Results'];
  public festivals: Festival[];
  constructor(private festivalService: FestivalService) {
  }

  ngOnInit(): void {
    this.festivalService.getFestivals().subscribe(festivals => {
      this.festivals = festivals;
    });
  }

  showHideOptions(currentTarget: any) {
    const itemContainer = currentTarget.closest('.f_item');
    itemContainer.querySelector('.f_festival-list').classList.toggle('is-hidden');
    itemContainer.querySelector('.f_rotate-icon').classList.toggle('rotate');
  }
}
