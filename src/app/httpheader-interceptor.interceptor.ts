import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HTTPHeaderInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const modifiedReq = request.clone({
      setHeaders: {
        'ngrok-skip-browser-warning': 'true',
        'Access-Control-Allow-Origin': '*',
      },
    });
    return next.handle(modifiedReq);
  }
}
