import { TestBed } from '@angular/core/testing';

import { GoogleChartsService } from './google-charts.service';

describe('GoogleChartsService', () => {
  let service: GoogleChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
