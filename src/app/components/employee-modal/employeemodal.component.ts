// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ApiService } from '../../services/api.service';
// import { Employee } from '../../models/employee';
// import { Department } from '../../models/department';
// @Component({
//   selector: 'app-employeemodal',
//   standalone: false,
//   templateUrl: './employeemodal.component.html',
//   styleUrl: './employeemodal.component.css'
// })
// export class EmployeemodalComponent {
//   employee: Employee = new Employee();
//   departments: Department[] = [];
//     constructor(
//       public dialogRef: MatDialogRef<EmployeemodalComponent>,
//       @Inject(MAT_DIALOG_DATA) public data: Employee | null,
//       private apiService: ApiService
//     ) {
//         if(data){
//         this.employee = data||new Employee(); 
//       }
//     }
//     ngOnInit(): void {
//       this.loadDepartments();
//     }
//     loadDepartments(): void {
//       this.apiService.getAllDepartments().subscribe({
//         next: (departments) => {
//           this.departments = departments;
//         },
//         error: (err) => {
//           console.error('Error loading departments:', err);
//         }
//       });
//     }
//       onSave(): void {
//         debugger;
//         if (this.employee.employeeId) {
//           this.apiService.updateEmployee(this.employee.employeeId,this.employee).subscribe({
//             next: (updatedEmployee) => {
//               console.log('Employee updated:', updatedEmployee);
//               this.dialogRef.close(updatedEmployee);  
//             },
//             error: (err) => {
//               console.error('Error updating department:', err);
//             }
//           });
//         } else {
//           this.apiService.createEmployee(this.employee).subscribe({
//             next: (newEmployee) => {
//               console.log('Employee created:', newEmployee);
//               this.dialogRef.close(newEmployee);  
//             },
//             error: (err) => {
//               console.error('Error creating Employee:', err);
//             }
//           });
//         }
//       }
//       onCancel(): void {
//         this.dialogRef.close();
//       }
// }
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { Employee } from '../../models/employee';
import { Department } from '../../models/department';

@Component({
  selector: 'app-employeemodal',
  standalone: false,
  templateUrl: './employeemodal.component.html',
  styleUrl: './employeemodal.component.css'
})
export class EmployeemodalComponent {
  employee: Employee = new Employee();
  departments: Department[] = [];
  selectedFile: File | null = null; 
  selectedEmployee: Employee | null = null;

  constructor(
    public dialogRef: MatDialogRef<EmployeemodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee | null,
    private apiService: ApiService
  ) {
    if (data) {
      this.employee = data || new Employee();
    }
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.apiService.getAllDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
      },
      error: (err) => {
        console.error('Error loading departments:', err);
      }
    });
  }
  
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSave(): void {
    if (!this.employee) {
      console.error(" No employee data provided.");
      return;
    }
  
    
  
    if (this.employee.employeeId) {
      // UPDATE EMPLOYEE
      this.apiService.updateEmployee(this.employee.employeeId, this.employee).subscribe({
        next: (updatedEmployee) => {
          console.log(' Employee updated:', updatedEmployee);
  
          if (this.selectedFile) {
            console.log(" Uploading file for Employee ID:", this.employee.employeeId);
            if (this.employee.employeeId !== undefined) {
              this.uploadFile(this.employee.employeeId);
            }
          } else {
            this.dialogRef.close(updatedEmployee);
          }
        },
        error: (err) => {
          console.error(' Error updating employee:', err);
        }
      });
    } else {
      // CREATE EMPLOYEE
      this.apiService.createEmployee(this.employee).subscribe({
        next: (newEmployee) => {
          console.log(' Employee created:', newEmployee);
  
          if (this.selectedFile) {
            console.log(" Uploading file for Employee ID:", newEmployee.employeeId);
            this.uploadFile(newEmployee.employeeId);
          } else {
            this.dialogRef.close(newEmployee);
          }
        },
        error: (err) => {
          console.error(' Error creating employee:', err);
        }
      });
    }
  }
  

  uploadFile(employeeId: number): void {
    if (this.selectedFile) {
      this.apiService.uploadFile(employeeId, this.selectedFile).subscribe({
        next: (response) => {
          console.log('File uploaded successfully:', response);
          this.dialogRef.close(response);
        },
        error: (err) => {
          console.error('Error uploading file:', err);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
