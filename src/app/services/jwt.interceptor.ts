import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UnauthorizedDialogComponent } from '../components/unauthorized-dialog/unauthorized-dialog.component';
import { AuthService } from './auth.service';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.dialog.open(UnauthorizedDialogComponent, {
            width: '400px',
            data: {
              message: 'Your session has expired or you are not authorized. Please log in again or contact your administrator.'
            }
          });
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
        if (error.status === 403) {
          this.dialog.open(UnauthorizedDialogComponent, {
            width: '400px',
            data: {
              message: 'You are not authorized to perform this action.'
            }
          });
        }
        return throwError(() => error);
      })
    );
  }
}