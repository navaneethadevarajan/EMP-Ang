
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import packageInfo from '../../../package.json';
import { ApiService } from './api.service'; // Import ApiService

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private version: string = packageInfo.version;

  constructor(private apiService: ApiService) {}

  getVersion(): string {
    return this.version;
  }

  getBackendVersion(): Observable<{ version: string }> {
    return this.apiService.getBackendVersion();
  }
}
