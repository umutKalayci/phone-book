import { TestBed } from '@angular/core/testing';

import { DbconvertService } from './dbconvert.service';

describe('DbconvertService', () => {
  let service: DbconvertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbconvertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
