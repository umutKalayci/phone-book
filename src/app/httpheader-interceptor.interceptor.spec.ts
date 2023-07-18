import { TestBed } from '@angular/core/testing';

import { HTTPHeaderInterceptorInterceptor } from './httpheader-interceptor.interceptor';

describe('HTTPHeaderInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HTTPHeaderInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HTTPHeaderInterceptorInterceptor = TestBed.inject(HTTPHeaderInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
