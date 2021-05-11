import {

    HttpEvent,
   
    HttpInterceptor,
   
    HttpHandler,
   
    HttpRequest,
   
    HttpResponse,
   
    HttpErrorResponse
   
   } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
   
   import { Observable, throwError } from 'rxjs';
   
   import { retry, catchError } from 'rxjs/operators';
   
   
   @Injectable()
   export class HttpErrorInterceptor implements HttpInterceptor {
   
    constructor(private router: Router,private snackBar:MatSnackBar){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token: string = localStorage.getItem('token'); 
      if(token){
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });// This clones HttpRequest and Authorization header with Bearer token added
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
      req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    }
  
      return next.handle(req)
   
        .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {

            if (error && error.status === 401) {
                console.log("ERROR 401 UNAUTHORIZED");
                this.snackBar.open('UNAUTHORIZED', 'Close',{duration:2000,panelClass: ['mat-toolbar', 'mat-primary']});
                this.router.navigate(['/login']) // in case of an error response the error message is displayed
                return throwError(error.error.errors[0].message); 
            }
            // const err = error.error.message || error.statusText;
            return throwError(error); // any further errors are returned to frontend                    
       })
        )
   
    }
   
   }