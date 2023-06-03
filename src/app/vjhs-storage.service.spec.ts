import { TestBed } from '@angular/core/testing';

import { VjhsStorageService } from './vjhs-storage.service';

describe('VjhsStorageService', () => {
  let service: VjhsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VjhsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
