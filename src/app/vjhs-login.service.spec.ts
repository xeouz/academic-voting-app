import { TestBed } from '@angular/core/testing';

import { VjhsLoginService } from './vjhs-login.service';

describe('VjhsLoginService', () => {
  let service: VjhsLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VjhsLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
