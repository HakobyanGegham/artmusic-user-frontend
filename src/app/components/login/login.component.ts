import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import FormHelper from '../../helpers/form-helper';
import {AuthService} from '../../services/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent extends FormHelper implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private cookieService: CookieService,
              private router: Router) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public submit(value: any) {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      this.authService.login(value).subscribe(token => {
        this.cookieService.set('token', token.token);
        this.router.navigateByUrl('/user');
      });
    } else {
      this.validateAllFormFields(this.form);
    }
  }

}
