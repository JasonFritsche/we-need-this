import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { SignUp } from 'src/app/store/user/user.actions';
import { IUserState } from 'src/app/store/user/user.reducers';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private userStore: Store<IUserState>,
    private formBuilder: FormBuilder
  ) {}

  public signUpForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
        this.passwordStrength,
      ]),
    ],
    verifyPassword: ['', [Validators.required, this.comparePassword]],
  });

  ngOnInit(): void {}

  // Convenience getter for easy access to form fields
  get form(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }

  handleSignUpButtonClick() {
    this.userStore.dispatch(SignUp({ payload: this.signUpForm.value }));
  }

  // Validator that compares password entry with verify password entry
  comparePassword(control: AbstractControl): ValidationErrors | null {
    if (
      control.parent?.get('password')?.value !==
      control.parent?.get('verifyPassword')?.value
    ) {
      return { passwordMatchError: { value: true } };
    }
    return null;
  }

  // Validator that ensure password meets password strength criteria (1 uppercase, 1 lowercase, 1 number, 1 special character)
  passwordStrength(control: AbstractControl): ValidationErrors | null {
    let hasNumber = /\d/.test(control.parent?.get('password')?.value);
    let hasUpper = /[A-Z]/.test(control.parent?.get('password')?.value);
    let hasLower = /[a-z]/.test(control.parent?.get('password')?.value);
    let hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      control.parent?.get('password')?.value
    );
    const valid = hasNumber && hasUpper && hasLower && hasSpecialCharacter;

    if (!valid) {
      return { passwordStrengthError: { value: true } };
    }
    return null;
  }
}
