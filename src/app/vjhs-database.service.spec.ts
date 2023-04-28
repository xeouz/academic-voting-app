import { TestBed } from '@angular/core/testing';

import { VjhsDatabaseService } from './vjhs-database.service';

describe('VjhsDatabaseService', () => {
  let service: VjhsDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VjhsDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
