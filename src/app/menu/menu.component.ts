import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  standalone: false,
  
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private router: Router) {}

  goToEmployee() {
    this.router.navigate(['/employee']); 
  }

  goToDepartment() {
    this.router.navigate(['/department']); 
  }

  goToUser() {
    this.router.navigate(['/user']);
  }
}
