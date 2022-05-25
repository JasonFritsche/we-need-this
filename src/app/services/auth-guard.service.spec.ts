import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';

import { RouterTestingModule } from '@angular/router/testing';

import * as fromUserSelectors from 'src/app/store/user/user.selectors';
import { provideMockStore } from '@ngrx/store/testing';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuardService,
        provideMockStore({
          selectors: [
            { selector: fromUserSelectors.getIsUserLoggedIn, value: false },
          ],
        }),
      ],
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
