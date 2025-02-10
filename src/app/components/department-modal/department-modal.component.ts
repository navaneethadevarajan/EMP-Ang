import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { Department } from '../../models/department';
@Component({
  selector: 'app-department-modal',
  standalone: false,
  
  templateUrl: './department-modal.component.html',
  styleUrl: './department-modal.component.css'
})
export class DepartmentModalComponent {
  department: Department = new Department();

  constructor(
    public dialogRef: MatDialogRef<DepartmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Department | null,
    private apiService: ApiService
  ) {
      if(data){
      this.department = data||new Department(); }
    
  }
    onSave(): void {
      if (this.department.departmentID) {
        this.apiService.updateDepartmentById(this.department.departmentID,this.department).subscribe({
          next: (updatedDepartment) => {
            console.log('Department updated:', updatedDepartment);
            this.dialogRef.close(updatedDepartment);  
          },
          error: (err) => {
            console.error('Error updating department:', err);
          }
        });
      } else {
        this.apiService.createDepartment(this.department).subscribe({
          next: (newDepartment) => {
            console.log('Department created:', newDepartment);
            this.dialogRef.close(newDepartment);  
          },
          error: (err) => {
            console.error('Error creating department:', err);
          }
        });
      }
    }
    onCancel(): void {
      this.dialogRef.close();
    }
}
