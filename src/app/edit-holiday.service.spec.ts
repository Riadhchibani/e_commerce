import { TestBed } from '@angular/core/testing';

import { EditHolidayService } from './edit-holiday.service';

describe('EditHolidayService', () => {
  let service: EditHolidayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditHolidayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
