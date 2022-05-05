import { createReducer, on } from '@ngrx/store';
import { IUser } from 'src/app/models/user';
import { Login, LoginError, LoginSuccess } from './user.actions';
export interface IUserState {
  user: IUser;
  hasError: boolean;
  isLoggedIn: boolean;
  isLoading: boolean;
}

export const UserState: IUserState = {
  user: {} as IUser,
  hasError: false,
  isLoggedIn: false,
  isLoading: false,
};

export const userReducer = createReducer(
  UserState,
  on(Login, (state, props) => ({
    ...state,
    user: props.payload,
    isLoading: true,
  })),
  on(LoginSuccess, (state, props) => ({
    ...state,
    ...props,
    isLoading: false,
    isLoggedIn: true,
  })),
  on(LoginError, (state, props) => ({
    ...state,
    ...props,
    isLoading: false,
    hasError: true,
  }))
);
