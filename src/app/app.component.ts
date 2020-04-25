import {Component, OnInit} from '@angular/core';
import {TokenService} from './services/token.service';
import {Route, Router} from '@angular/router';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'artmusic-user-frontend';

  constructor() {
  }

  public ngOnInit(): void {
    console.log(123);
  }
}
