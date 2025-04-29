import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { username: '', password: '' };
  loginFailed = false;

  constructor(private apiService: ApiService, private router: Router,private authService:AuthService) {}

  onLogin() {
    this.apiService.login(this.loginData).subscribe({
      next: (res: any) => {
        this.authService.setToken( res.token);
        this.router.navigate(['/menu']); 
      },
      error: () => {
        this.loginFailed = true;
      }
    });
  }
}
