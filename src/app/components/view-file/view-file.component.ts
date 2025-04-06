
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-file',
  standalone: false,
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.css']
})
export class ViewFileComponent implements OnInit {
  fileUrl: SafeResourceUrl | null = null;
  employeeId: number | null = null;
  isAzureFile: boolean = false;
  apiUrl = 'http://localhost:5081/GetEmployeeFile';

  constructor(
    public dialogRef: MatDialogRef<ViewFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number },
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (this.data?.employeeId) {
      this.employeeId = this.data.employeeId;
      this.loadFile();
    }
  }

  loadFile(): void {
    if (!this.employeeId) return;
  
    const fileRequestUrl = `${this.apiUrl}/${this.employeeId}`;
  
    this.http.get<{ fileUrl: string }>(fileRequestUrl).subscribe((response) => {
      if (response?.fileUrl) {
        this.isAzureFile = response.fileUrl.startsWith('https://');
  
        if (this.isAzureFile) {
          this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(response.fileUrl);
        } else {
          const baseUrl = 'http://localhost:5081'; 
          this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(baseUrl + response.fileUrl);
        }
      }
    }, (error) => {
      console.error('Error loading file:', error);
      this.fileUrl = null;
    });
  }
  
  downloadFile(): void {
    if (!this.employeeId) return;
  
    const fileRequestUrl = `${this.apiUrl}/${this.employeeId}`;
  
    this.http.get(fileRequestUrl, { responseType: 'blob' }).subscribe((blob) => {
      const fileUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = `Employee_${this.employeeId}.pdf`; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(fileUrl); 
    }, (error) => {
      console.error('Error downloading file:', error);
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
