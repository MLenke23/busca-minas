import { TestBed } from '@angular/core/testing';

import { GeneralStatusService } from './general-status.service';

describe('GeneralStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralStatusService = TestBed.get(GeneralStatusService);
    expect(service).toBeTruthy();
  });
});
