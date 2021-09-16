import {Injectable} from '@angular/core';
import {
	HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler):
		Observable<HttpEvent<any>> {
		// console.log('req: ', req);
		return next.handle(req)
			// .pipe(
			// tap(
			// 	response => console.log('response: ', response),
			// 	error => console.log('error: ', error)
			// 	))
			;
	}
}
