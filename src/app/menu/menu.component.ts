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

  // Navigate to the Employee CRUD page
  goToEmployee() {
    this.router.navigate(['/employee']); // Ensure the correct route for Employee page
  }

  // Navigate to the Department CRUD page
  goToDepartment() {
    this.router.navigate(['/department']); // Ensure the correct route for Department page
  }
}
