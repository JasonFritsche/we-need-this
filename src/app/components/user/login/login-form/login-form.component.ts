import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Login } from 'src/app/store/user/user.actions';
import { IUserState } from 'src/app/store/user/user.reducers';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userStore: Store<IUserState>
  ) {}

  ngOnInit(): void {}

  public passwordVisibility = 'password';
  public passwordVisibilityIcon = 'eye-outline';
  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  togglePasswordVisibilty(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.passwordVisibility === 'password') {
      this.passwordVisibility = 'text';
      this.passwordVisibilityIcon = 'eye-off-outline';
    } else {
      this.passwordVisibility = 'password';
      this.passwordVisibilityIcon = 'eye-outline';
    }
  }

  public handleLoginButtonClick() {
    this.userStore.dispatch(Login({ payload: this.loginForm.value }));
  }
}
