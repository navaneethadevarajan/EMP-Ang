import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backtomenu',
  standalone: false,
  
  templateUrl: './backtomenu.component.html',
  styleUrl: './backtomenu.component.css'
})
export class BacktomenuComponent {
  constructor( private router:Router) {}
  goBackToMenu() {
    this.router.navigate(['/menu']);
  }
}
