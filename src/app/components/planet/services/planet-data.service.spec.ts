import { TestBed } from '@angular/core/testing';

import { PlanetDataService } from './planet-data.service';

describe('PlanetDataService', () => {
  let service: PlanetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
