import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import FormHelper from '../../helpers/form-helper';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent extends FormHelper implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) {
    super();
  }

  public ngOnInit(): void {
    const userData = this.tokenService.getUser();

    if (userData) {
      const user = JSON.parse(userData) as User;
      this.router.navigateByUrl(`/${user.role}`);
    }
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
      this.authService.login(value).subscribe(user => {
        this.tokenService.saveUser(user);
        this.tokenService.saveToken(user.token);
        this.router.navigateByUrl(`/${user.role}`);
      });
    } else {
      this.validateAllFormFields(this.form);
    }
  }
}
