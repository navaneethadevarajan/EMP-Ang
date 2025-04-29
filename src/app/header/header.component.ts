

// import { Component, OnInit } from '@angular/core';
// import { VersionService } from '../services/version.service';

// @Component({
//   selector: 'app-header',
//   standalone: false,
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit {
//   frontendVersion: string = '';
//   backendVersion: string = 'Loading...';

//   constructor(private versionService: VersionService) {}

//   ngOnInit() {
//     // frontend version
//     this.frontendVersion = this.versionService.getVersion();

//     // backend version
//     this.versionService.getBackendVersion().subscribe({
//       next: (response) => {
//         this.backendVersion = response.version;
//       },
//       error: (err) => {
//         console.error('Error fetching backend version:', err);
//         this.backendVersion = 'Unavailable';
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { VersionService } from '../services/version.service';
import { AuthService } from '../services/auth.service'; // 👈 Add this

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  frontendVersion: string = '';
  backendVersion: string = 'Loading...';
  
  constructor(
    private versionService: VersionService,
    public authService: AuthService // 👈 Inject authService (public if used in template)
  ) {}

  ngOnInit() {
    this.frontendVersion = this.versionService.getVersion();

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

  logout() {
    this.authService.logout();
    window.location.href = '/login'; // 👈 Redirect to login after logout
  }
}
