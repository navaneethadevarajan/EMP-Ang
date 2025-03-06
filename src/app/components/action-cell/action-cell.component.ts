import { Component } from '@angular/core';
import { ICellRendererParams,} from 'ag-grid-community';

@Component({
  selector: 'app-action-cell',
standalone:false,  
  templateUrl: `./action-cell.component.html`,
  styleUrl: './action-cell.component.css'
})
export class ActionCellComponent  {
  params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  onEdit(): void {
    if(this.params.context.componentParent.openEmployeeModal){
      this.params.context.componentParent.openEmployeeModal(this.params.data);
    }
    else if(this.params.context.componentParent.openDepartmentModal){
    this.params.context.componentParent.openDepartmentModal(this.params.data);
    }
  }
//  onDelete(): void {
//   if(this.params.context.componentParent.OnDelete){
//     const employeeId = this.params.data.employeeId;
//     if (confirm('Are you sure you want to delete this employee?')) {
//       this.params.context.componentParent.OnDelete(employeeId);
//     }
//   }

//   else if(this.params.context.componentParent.OnDelete){
//   const departmentID = this.params.data.departmentID;
//   if (confirm('Are you sure you want to delete this department?')) {
//     this.params.context.componentParent.OnDelete(departmentID);
//   }
//   }

// }
onDelete(): void {
  // Check if the parent component has an OnDelete method
  if (this.params.context.componentParent.OnDelete) {
    // Determine if we are dealing with an employee or department
    const id = this.params.data.employeeId || this.params.data.departmentID;

    // Determine the type of entity (employee or department) and the confirmation message
    const isEmployee = this.params.data.employeeId != null;
    const message = isEmployee 
      ? 'Are you sure you want to delete this employee?' 
      : 'Are you sure you want to delete this department?';
    
    console.log('ID to delete:', id);  // Log the ID being deleted for debugging

    // Show confirmation prompt and call the parent component's OnDelete method
    if (confirm(message)) {
      if (isEmployee) {
        // If it’s an employee, call the employee deletion method
        this.params.context.componentParent.OnDelete(id);
      } else {
        // If it’s a department, call the department deletion method
        this.params.context.componentParent.OnDelete(id);
      }
    }
  }
}

}

   