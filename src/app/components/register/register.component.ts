import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private cookieService: CookieService) {
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public getFormControl(name) {
    return this.registerForm.get(name);
  }

  public submit(value: any) {
    this.formSubmitAttempt = true;
    if (this.registerForm.valid) {
      this.authService.register(value).subscribe(token => {
        this.cookieService.set('token', token.token);
      });
    } else {
      this.validateAllFormFields(this.registerForm);
    }
  }

  public isFieldValid(field: string) {
    return (!this.registerForm.get(field).valid && this.registerForm.get(field).touched) ||
      (this.registerForm.get(field).untouched && this.formSubmitAttempt);
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({onlySelf: true});
    });
  }

  public displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field)
    };
  }
}
