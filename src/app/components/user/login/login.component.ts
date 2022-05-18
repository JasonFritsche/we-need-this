import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Login } from 'src/app/store/user/user.actions';
import { IEmailUser } from 'src/app/models/user';
import { IUserState } from 'src/app/store/user/user.reducers';
import * as fromUserSelectors from 'src/app/store/user/user.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private userStore: Store<IUserState>) {}

  isLoginLoading$!: Observable<boolean>;
  isUserLoggedIn$!: Observable<boolean>;

  ngOnInit(): void {
    this.isLoginLoading$ = this.userStore.select(
      fromUserSelectors.getIsUserLoading
    );
    this.isUserLoggedIn$ = this.userStore.select(
      fromUserSelectors.getIsUserLoggedIn
    );
  }

  handleLoginButtonClick() {
    console.log('clicked login btn');
    const user: IEmailUser = { email:'test@test.com', password: '123456' };
    this.userStore.dispatch(Login({ payload: user }));
  }
}
