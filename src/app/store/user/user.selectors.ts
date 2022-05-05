import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserReducers from './user.reducers';
import { IUserState } from './user.reducers';

export const getUserState =
  createFeatureSelector<fromUserReducers.IUserState>('user');

export const getIsUserLoading = createSelector(
  getUserState,
  (state: IUserState) => state.isLoading
);

export const getIsUserLoggedIn = createSelector(
  getUserState,
  (state: IUserState) => state.isLoggedIn
);
