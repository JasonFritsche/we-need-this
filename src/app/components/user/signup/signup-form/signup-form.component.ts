import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SignUp } from 'src/app/store/user/user.actions';
import { IUserState } from 'src/app/store/user/user.reducers';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit, OnDestroy {
  constructor(
    private userStore: Store<IUserState>,
    private formBuilder: FormBuilder
  ) {}

  private subscriptions: Subscription[] = [];

  public isEmailFocused = false;
  public isUsernameFocused = false;
  public isPasswordFocused = false;
  public isVerifyPasswordFocused = false;

  public emailValidation = {
    isValid: false,
  };

  public usernameValidation = {
    isValid: false,
  };

  public passwordValidation = {
    hasNumber: false,
    hasUpper: false,
    hasLower: false,
    hasSpecialCharacter: false,
    hasMinlength: false,
  };

  public verifyPasswordValidation = {
    isVerified: false,
  };
  public passwordVisibility = 'password';
  public passwordVisibilityIcon = 'eye-outline';
  public verifyPasswordVisibility = 'password';
  public verifyPasswordVisibilityIcon = 'eye-outline';

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

  passwordHasNumber = (control: AbstractControl): ValidationErrors | null => {
    const hasNumber = /\d/.test(control.value);
    if (!hasNumber) {
      this.passwordValidation.hasNumber = false;
      return { passwordNumberError: { value: true } };
    }
    this.passwordValidation.hasNumber = true;
    return null;
  };

  passwordHasUpperCase = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const hasUpper = /[A-Z]/.test(control.value);

    if (!hasUpper) {
      this.passwordValidation.hasUpper = false;
      return { passwordUpperCaseError: { value: true } };
    }
    this.passwordValidation.hasUpper = true;
    return null;
  };

  passwordHasLowerCase = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const hasLower = /[a-z]/.test(control.value);

    if (!hasLower) {
      this.passwordValidation.hasLower = false;
      return { passwordLowerCaseError: { value: true } };
    }
    this.passwordValidation.hasLower = true;
    return null;
  };

  passwordHasSpecialCharacter = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      control.value
    );

    if (!hasSpecialCharacter) {
      this.passwordValidation.hasSpecialCharacter = false;
      return { passwordSpecialCharacterError: { value: true } };
    }
    this.passwordValidation.hasSpecialCharacter = true;
    return null;
  };

  public signUpForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(5)]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
        this.passwordHasSpecialCharacter,
        this.passwordHasLowerCase,
        this.passwordHasNumber,
        this.passwordHasUpperCase,
      ],
    ],
    verifyPassword: ['', [Validators.required, this.comparePassword]],
  });

  ngOnInit(): void {
    this.subscriptions.push(
      this.form['username'].valueChanges.subscribe(() => {
        if (this.form['username'].errors) {
          this.usernameValidation.isValid = false;
        } else {
          this.usernameValidation.isValid = true;
        }
      })
    );

    this.subscriptions.push(
      this.form['email'].valueChanges.subscribe(() => {
        if (this.form['email'].errors) {
          this.emailValidation.isValid = false;
        } else {
          this.emailValidation.isValid = true;
        }
      })
    );

    this.subscriptions.push(
      this.form['password'].valueChanges.subscribe(() => {
        if (this.form['password'].hasError('minlength')) {
          this.passwordValidation.hasMinlength = false;
        } else {
          this.passwordValidation.hasMinlength = true;
        }
      })
    );

    this.subscriptions.push(
      this.form['verifyPassword'].valueChanges.subscribe(() => {
        if (this.form['verifyPassword'].errors) {
          this.verifyPasswordValidation.isVerified = false;
        } else {
          this.verifyPasswordValidation.isVerified = true;
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length) {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
  }

  // Convenience getter for easy access to form fields
  get form(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }

  handleSignUpButtonClick() {
    this.userStore.dispatch(SignUp({ payload: this.signUpForm.value }));
  }

  togglePasswordVisibilty(event: MouseEvent, type: string) {
    event.preventDefault();
    event.stopPropagation();
    if (type === 'password') {
      if (this.passwordVisibility === 'password') {
        this.passwordVisibility = 'text';
        this.passwordVisibilityIcon = 'eye-off-outline';
      } else {
        this.passwordVisibility = 'password';
        this.passwordVisibilityIcon = 'eye-outline';
      }
    } else if (type === 'verifyPassword') {
      if (this.verifyPasswordVisibility === 'password') {
        this.verifyPasswordVisibility = 'text';
        this.verifyPasswordVisibilityIcon = 'eye-off-outline';
      } else {
        this.verifyPasswordVisibility = 'password';
        this.verifyPasswordVisibilityIcon = 'eye-outline';
      }
    }
  }
}
