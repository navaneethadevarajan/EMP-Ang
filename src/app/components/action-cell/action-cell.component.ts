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

onDelete(): void {
  if (this.params.context.componentParent.OnDelete) {
    const id = this.params.data.employeeId || this.params.data.departmentID;
    const isEmployee = this.params.data.employeeId != null;
    const message = isEmployee 
      ? 'Are you sure you want to delete this employee?' 
      : 'Are you sure you want to delete this department?';
    
    console.log('ID to delete:', id); 
    if (confirm(message)) {
      if (isEmployee) {
        this.params.context.componentParent.OnDelete(id);
      } else {
        this.params.context.componentParent.OnDelete(id);
      }
    }
  }
}

}

   