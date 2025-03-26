import { Component } from '@angular/core';
import { VersionService } from '../services/version.service';
@Component({
  selector: 'app-footer',
  standalone: false,
  
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  version: string;

  constructor(private versionService: VersionService) {
    this.version = this.versionService.getVersion();
  }

}
