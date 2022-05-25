import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUserState } from 'src/app/store/user/user.reducers';
import * as fromUserSelectors from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private userStore: Store<IUserState>) {}

  isUserLoggedIn$!: Observable<boolean>;

  ngOnInit(): void {
    this.isUserLoggedIn$ = this.userStore.select(
      fromUserSelectors.getIsUserLoggedIn
    );
  }
}
