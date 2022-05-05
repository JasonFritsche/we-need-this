import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { LoginSuccess } from './user.actions';

@Injectable()
export class UserEffects {
  userLogin$ = createEffect(() =>
    this.actions.pipe(
      ofType('[User] LOGIN'),
      switchMap((payload) => {
        return of(LoginSuccess(payload));
      })
    )
  );

  userLoginSuccess$ = createEffect(
    () =>
      this.actions.pipe(
        ofType('[User] LOGIN Success'),
        tap(() => this.router.navigate(['/dashboard']))
      ),
    { dispatch: false }
  );

  constructor(private actions: Actions, private router: Router) {}
}
