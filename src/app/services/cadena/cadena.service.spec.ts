import { TestBed } from '@angular/core/testing';

import { CadenaService } from './cadena.service';

describe('CadenaService', () => {
  let service: CadenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadenaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
