// import { Component, Inject, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-view-file',
//   standalone: false,
//   templateUrl: './view-file.component.html',
//   styleUrls: ['./view-file.component.css']
// })
// export class ViewFileComponent implements OnInit {
//   fileUrl: SafeResourceUrl | null = null;
//   employeeId: number | null = null;
//   apiUrl = 'http://localhost:5081/GetEmployeeFile'; 

//   constructor(
//     public dialogRef: MatDialogRef<ViewFileComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { employeeId: number },
//     private sanitizer: DomSanitizer,
//     private http: HttpClient
//   ) {}

//   ngOnInit(): void {
//     if (this.data && this.data.employeeId) {
//       this.employeeId = this.data.employeeId;
//       this.loadFile();
//     }
//   }

//   loadFile(): void {
//     if (!this.employeeId) return;
  
//     const fileRequestUrl = `${this.apiUrl}/${this.employeeId}`;
  
//     this.http.get(fileRequestUrl, { responseType: 'text' }).subscribe((fileResponse: string) => {
//       if (!fileResponse) {
//         console.error('No file URL returned from API');
//         this.fileUrl = null;
//         return;
//       }
  
//       if (fileResponse.startsWith('http')) {
//         // If the API returns an Azure Blob Storage URL, trust it directly
//         this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileResponse);
//       } else {
//         // If the API returns a local file path, fetch it as a blob
//         this.http.get(fileResponse, { responseType: 'blob' }).subscribe((fileBlob) => {
//           const blobUrl = URL.createObjectURL(fileBlob);
//           this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
//         }, (error) => {
//           console.error('Error loading local file:', error);
//           this.fileUrl = null;
//         });
//       }
//     }, (error) => {
//       console.error('Error fetching file URL:', error);
//       this.fileUrl = null;
//     });
//   }
  
//   downloadFile(): void {
//     if (this.employeeId) {
//       const fileRequestUrl = `${this.apiUrl}/${this.employeeId}`;

//       // Fetch the file as a blob
//       this.http.get(fileRequestUrl, { responseType: 'blob' }).subscribe((fileBlob) => {
//         const blobUrl = URL.createObjectURL(fileBlob);

//         // Create a temporary anchor tag and trigger download
//         const a = document.createElement('a');
//         a.href = blobUrl;
//         a.download = `Employee_${this.employeeId}.pdf`; // Custom filename
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);

//         // Revoke the object URL after download to free memory
//         URL.revokeObjectURL(blobUrl);
//       }, (error) => {
//         console.error('Error downloading file:', error);
//       });
//     }
//   }

//   close(): void {
//     this.dialogRef.close();
//   }
// }



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
          // ✅ Azure Storage (Use Direct URL)
          this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(response.fileUrl);
        } else {
          // ✅ Local Storage (Assume it's served statically from the backend)
          const baseUrl = 'http://localhost:5081'; // Adjust if deployed
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
      a.download = `Employee_${this.employeeId}.pdf`; // Ensure correct file name & extension
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(fileUrl); // Cleanup memory
    }, (error) => {
      console.error('Error downloading file:', error);
    });
  }
  

  close(): void {
    this.dialogRef.close();
  }
}
