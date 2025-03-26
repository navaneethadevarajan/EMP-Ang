// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-header',
//   standalone: false,
  
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.css'
// })
// export class HeaderComponent {
//  toggleSidebar() {
//   console.log('Sidebar toggled!');
  
// }
// }
import { Component, OnInit } from '@angular/core';
import { VersionService } from '../services/version.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  frontendVersion: string = '';
  backendVersion: string = 'Loading...';

  constructor(private versionService: VersionService) {}

  ngOnInit() {
    // Get frontend version
    this.frontendVersion = this.versionService.getVersion();

    // Get backend version
    this.versionService.getBackendVersion().subscribe({
      next: (response) => {
        this.backendVersion = response.version;
      },
      error: (err) => {
        console.error('Error fetching backend version:', err);
        this.backendVersion = 'Unavailable';
      }
    });
  }
}

