import { TestBed } from '@angular/core/testing';

import { ShellServiceService } from './shell-service.service';

describe('ShellServiceService', () => {
  let service: ShellServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShellServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
