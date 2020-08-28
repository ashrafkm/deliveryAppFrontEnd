import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
    constructor() { }

    intercept(request: any, next: HttpHandler): Observable<HttpEvent<any>> {
        const header1 = new HttpHeaders();
        header1.set('isMobile', 'true');
        const param = request.url.split('?');
        if (param.length > 1 && !param.includes('isMobile')) {
            request.url = request.url + '&isMobile=true';
        } else {
            request.url = request.url + '?isMobile=true';
        }
        const updatedRequest: HttpRequest<any> = request.clone({});
        return next.handle(updatedRequest).pipe(
            tap(
                (event) => {
                    if (event instanceof HttpResponse) {
                    }
                },
                async (error) => {
                    console.log('ererr');
                    if (error.status === 0) {

                    }
                    if (error.status === 400) {

                    }
                    if (event instanceof HttpResponse) {
                    }
                }
            )
        );
    }
}
