import { TestBed } from '@angular/core/testing';

import { CharacterResolverService } from './character-resolver.service';

describe('CharacterResolverService', () => {
  let service: CharacterResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
