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
  
    constructor(
      public dialogRef: MatDialogRef<EmployeemodalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Employee | null,
      private apiService: ApiService
    ) {
        if(data){
        this.employee = data||new Employee(); 
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
      onSave(): void {
        debugger;
        if (this.employee.employeeId) {
          this.apiService.updateEmployee(this.employee.employeeId,this.employee).subscribe({
            next: (updatedEmployee) => {
              console.log('Employee updated:', updatedEmployee);
              this.dialogRef.close(updatedEmployee);  
            },
            error: (err) => {
              console.error('Error updating department:', err);
            }
          });
        } else {
          this.apiService.createEmployee(this.employee).subscribe({
            next: (newEmployee) => {
              console.log('Employee created:', newEmployee);
              this.dialogRef.close(newEmployee);  
            },
            error: (err) => {
              console.error('Error creating Employee:', err);
            }
          });
        }
      }
      onCancel(): void {
        this.dialogRef.close();
      }

}
