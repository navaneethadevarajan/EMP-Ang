import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { UnauthorizedDialogComponent } from './components/unauthorized-dialog/unauthorized-dialog.component';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const allowedRoles = route.data['allowedRoles'];
    const decodedToken: any = jwtDecode(token);
    const userRole = decodedToken.role;

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      this.dialog.open(UnauthorizedDialogComponent);
      this.toastr.error('Access Denied: You do not have permission to view this page.');
      return false;
    }

    return true;
  }
}
