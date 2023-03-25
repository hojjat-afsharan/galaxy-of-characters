import { TestBed } from '@angular/core/testing';

import { PeopleDataServiceService } from './people-data-service.service';

describe('PeopleDataServiceService', () => {
  let service: PeopleDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
