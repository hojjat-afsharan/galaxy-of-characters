import { TestBed } from '@angular/core/testing';

import { PeopeQueryParamValidationGuardService } from './peope-query-param-validation-guard.service';

describe('PeopeQueryParamValidationGuardService', () => {
  let service: PeopeQueryParamValidationGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopeQueryParamValidationGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
