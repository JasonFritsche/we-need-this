import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUserState } from '../store/user/user.reducers';
import * as fromUserSelectors from 'src/app/store/user/user.selectors';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, private userStore: Store<IUserState>) {}

  canActivate(): Observable<boolean> {
    return this.userStore.select(fromUserSelectors.getIsUserLoggedIn).pipe(
      distinctUntilChanged(),
      map((isUserLoggedIn) => {
        if (!isUserLoggedIn) {
          console.log(isUserLoggedIn);
          this.router.navigate(['/login']);
        }
        return isUserLoggedIn;
      })
    );
  }
}
