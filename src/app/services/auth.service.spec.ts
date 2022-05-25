import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import * as fromUserSelectors from 'src/app/store/user/user.selectors';
import { provideMockStore } from '@ngrx/store/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        provideMockStore({
          selectors: [
            { selector: fromUserSelectors.getIsUserLoggedIn, value: false },
          ],
        }),
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
