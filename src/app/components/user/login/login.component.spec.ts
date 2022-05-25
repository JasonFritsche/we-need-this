import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { LoginComponent } from './login.component';
import * as fromUserSelectors from 'src/app/store/user/user.selectors';
import { ContainerComponent } from 'src/app/modules/shared/components/container/container.component';
import { MockComponent } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LoginComponent, MockComponent(ContainerComponent)],
      providers: [
        provideMockStore({
          selectors: [
            { selector: fromUserSelectors.getIsUserLoggedIn, value: false },
            { selector: fromUserSelectors.getIsUserLoading, value: false },
          ],
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
