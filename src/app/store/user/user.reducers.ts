import { createReducer, on } from '@ngrx/store';
import { IEmailUser } from 'src/app/models/user';
import { Login, LoginError, LoginSuccess, SignUp, SignUpSuccess, SignUpError } from './user.actions';
export interface IUserState {
  user: IEmailUser;
  hasError: boolean;
  isLoggedIn: boolean;
  isLoading: boolean;
}

export const UserState: IUserState = {
  user: {} as IEmailUser,
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
  })),
  on(SignUp, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(SignUpSuccess, (state) => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
  })),
  on(SignUpError, (state) => ({
    ...state,
    isLoading: false,
    hasError: true,
  }))
);
