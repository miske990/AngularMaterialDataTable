import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class HttpApiInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(req).pipe(
            map((res) => {
                console.log(res)
                return res || {}
            }),
            catchError((error) => {
                return throwError(this.handleHttpError(error))
            })
        );
    }
        
    // Error handling
    handleHttpError(error: HttpErrorResponse) {
        let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
                errorMessage = error.error.message;
            } else {
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}