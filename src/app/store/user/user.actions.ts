import { createAction, props } from '@ngrx/store';
import { IEmailUser } from '../../models/user';

export enum UserActionsEnum {
  LOGIN = '[User] LOGIN',
  LOGIN_SUCCESS = '[User] LOGIN Success',
  LOGIN_ERROR = '[User] LOGIN Error',
  SIGNUP = '[User] SIGNUP',
  SIGNUP_SUCCESS = '[User] SIGNUP Success',
  SIGNUP_ERROR = '[User] SIGNUP Error',
}

export const Login = createAction('[User] LOGIN', props<{ payload: IEmailUser }>());

export const LoginSuccess = createAction(
  '[User] LOGIN Success',
  props<{ payload: IEmailUser }>()
);

export const LoginError = createAction(
  '[User] LOGIN Error',
  props<{ payload: string }>()
);

export const SignUp = createAction('[User] SIGNUP', props<{ payload: IEmailUser }>());

export const SignUpSuccess = createAction(
  '[User] SIGNUP Success',
  props<{ payload: IEmailUser }>()
);

export const SignUpError = createAction(
  '[User] SIGNUP Error',
  props<{ payload: string }>()
);
