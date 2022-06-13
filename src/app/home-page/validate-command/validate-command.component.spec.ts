import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateCommandComponent } from './validate-command.component';

describe('ValidateCommandComponent', () => {
  let component: ValidateCommandComponent;
  let fixture: ComponentFixture<ValidateCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateCommandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
