import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.less']
})
export class AddApplicationComponent implements OnInit {

  constructor(private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.redirect();
  }

  private redirect() {
    const token = this.cookieService.get('token');

    if (!token) {
      this.router.navigateByUrl('login');
    }
  }

}
