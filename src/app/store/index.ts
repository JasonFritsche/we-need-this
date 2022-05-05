import { ActionReducerMap } from '@ngrx/store';
import * as fromUserReducers from './user/user.reducers';

export interface State {
  user: fromUserReducers.IUserState;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUserReducers.userReducer,
};
