import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {DOCUMENT} from '@angular/common';
import FormHelper from '../../helpers/form-helper';
import {Router} from '@angular/router';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent extends FormHelper implements OnInit {

  public form: FormGroup;
  protected formSubmitAttempt: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public submit(value: any) {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      this.authService.register(value).subscribe(user => {
        this.tokenService.saveUser(user);
        this.tokenService.saveToken(user.token);
        this.router.navigateByUrl(`/${user.role}`);
      });
    } else {
      this.validateAllFormFields(this.form);
    }
  }
}
