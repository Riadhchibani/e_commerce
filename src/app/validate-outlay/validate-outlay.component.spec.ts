import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateOutlayComponent } from './validate-outlay.component';

describe('ValidateOutlayComponent', () => {
  let component: ValidateOutlayComponent;
  let fixture: ComponentFixture<ValidateOutlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateOutlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateOutlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
