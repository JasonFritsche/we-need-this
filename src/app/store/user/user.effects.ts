import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  userLogin$ = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.Login),
      switchMap((payload) => {
        return of(UserActions.LoginSuccess(payload));
      })
    )
  );

  userLoginSuccess$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(UserActions.LoginSuccess),
        tap(() => this.router.navigate(['/dashboard']))
      ),
    { dispatch: false }
  );

  userSignUp$ = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.SignUp),
      switchMap((action) =>
        from(
          this.authService.signUp(
            action.payload.email,
            action.payload.password,
            action.payload.username ?? ''
          )
        ).pipe(
          map(() => UserActions.SignUpSuccess({ payload: action.payload })),
          catchError((err) => of(UserActions.SignUpError(err.message)))
        )
      )
    )
  );

  userSignUpSuccess$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(UserActions.SignUpSuccess),
        tap(() => this.router.navigate(['/dashboard']))
      ),
    { dispatch: false }
  );

  userSignOutSuccess$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(UserActions.SignOutSuccess),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );

  userSignOut$ = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.SignOut),
      switchMap((action) =>
        from(this.authService.signOut()).pipe(
          map(() => UserActions.SignOutSuccess()),
          catchError((err) => of(UserActions.SignOutError()))
        )
      )
    )
  );

  constructor(
    private actions: Actions,
    private router: Router,
    private authService: AuthService
  ) {}
}
