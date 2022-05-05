import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models/user';

export const Login = createAction('[User] LOGIN', props<{ payload: IUser }>());

export const LoginSuccess = createAction(
  '[User] LOGIN Success',
  props<{ payload: IUser }>()
);

export const LoginError = createAction(
  '[User] LOGIN Error',
  props<{ payload: string }>()
);
