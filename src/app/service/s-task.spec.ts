import { TestBed } from '@angular/core/testing';

import { STask } from './s-task';

describe('STask', () => {
  let service: STask;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(STask);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
