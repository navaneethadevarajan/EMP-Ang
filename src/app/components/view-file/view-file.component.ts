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
  apiUrl = 'http://localhost:5081/GetEmployeeFile'; // ✅ Base API URL

  constructor(
    public dialogRef: MatDialogRef<ViewFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number },
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.employeeId) {
      this.employeeId = this.data.employeeId;
      this.loadFile();
    }
  }

  loadFile(): void {
    if (this.employeeId) {
      const fileRequestUrl = `${this.apiUrl}/${this.employeeId}`;
      
      // Fetch the file as a blob
      this.http.get(fileRequestUrl, { responseType: 'blob' }).subscribe((fileBlob) => {
        // Convert blob into an object URL
        const blobUrl = URL.createObjectURL(fileBlob);

        // Bypass Angular security and set the URL
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
      }, (error) => {
        console.error('Error loading file:', error);
        this.fileUrl = null; // Handle errors gracefully
      });
    }
  }

  downloadFile(): void {
    if (this.employeeId) {
      const fileRequestUrl = `${this.apiUrl}/${this.employeeId}`;

      // Fetch the file as a blob
      this.http.get(fileRequestUrl, { responseType: 'blob' }).subscribe((fileBlob) => {
        const blobUrl = URL.createObjectURL(fileBlob);

        // Create a temporary anchor tag and trigger download
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `Employee_${this.employeeId}.pdf`; // Custom filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Revoke the object URL after download to free memory
        URL.revokeObjectURL(blobUrl);
      }, (error) => {
        console.error('Error downloading file:', error);
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
