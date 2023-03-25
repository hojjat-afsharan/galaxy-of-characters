import { TestBed } from '@angular/core/testing';

import { PeopleDataService } from './people-data.service';

describe('PeopleDataServiceService', () => {
  let service: PeopleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
