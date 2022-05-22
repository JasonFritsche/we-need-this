import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldValidationIndicatorComponent } from './field-validation-indicator.component';

describe('FieldValidationIndicatorComponent', () => {
  let component: FieldValidationIndicatorComponent;
  let fixture: ComponentFixture<FieldValidationIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldValidationIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldValidationIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
