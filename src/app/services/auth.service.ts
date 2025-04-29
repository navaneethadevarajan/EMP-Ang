import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {jwtDecode} from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private secretKey = environment.secretKey; 
  constructor() {
    console.log('secret key:',this.secretKey);
    this.testEncryptDecrypt();
  }
  
  private encryptToken(token: string): string {
    return CryptoJS.AES.encrypt(token, this.secretKey).toString();
  }

  private decryptToken(encryptedToken: string): string {
    console.log('Encrypted Token:', encryptedToken);
    try{
    const bytes = CryptoJS.AES.decrypt(encryptedToken, this.secretKey);
  
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    console.log('Decrypted Token:', decrypted);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
      console.error('Decryption error:', error);
      return '';
    }
  }
  setToken(token: string): void {
    const encryptedToken = this.encryptToken(token);
    console.log('Encrypted Token in settoken', encryptedToken);
    localStorage.setItem('token', encryptedToken);
  }

  getToken(): string | null {
    const encryptedToken = localStorage.getItem('token');
    if (!encryptedToken) return null;

    const decryptedToken = this.decryptToken(encryptedToken);
    return decryptedToken|| null;
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded?.role || null;
    } catch (error) {
      console.error('Token decode failed', error);
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.clear();
  }
  testEncryptDecrypt(): void {
    const test:string = 'Hello, World!';
    const encrypted=CryptoJS.AES.encrypt(test, this.secretKey).toString();
    console.log('Encrypted:', encrypted);
    const decrypted = CryptoJS.AES.decrypt(encrypted, this.secretKey).toString(CryptoJS.enc.Utf8);
    console.log('Decrypted:', decrypted);
  }
}
