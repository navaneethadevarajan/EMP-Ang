import { Injectable } from '@angular/core';
import packageInfo from '../../../package.json';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  private appVersion: string = packageInfo.version;

  getVersion(): string {
    return this.appVersion;
  }}
