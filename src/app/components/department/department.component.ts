import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Department } from '../../models/department';
import { ColDef,GridOptions, themeBalham, themeQuartz } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentModalComponent } from '../department-modal/department-modal.component';
import { ActionCellComponent } from '../action-cell/action-cell.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-department',
  standalone: false,
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  newDepartment: Department = new Department();
  departments: Department[] = [];
  departmentID: number = 0;
  message: string = '';
  
  columnDefs: ColDef[] = [
    { headerName: 'DEPARTMENT ID', field: 'departmentID' },
    { headerName: 'DEPARTMENT NAME', field: 'departmentName' },
    {
      headerName: 'ACTIONS',
      field: 'actions',
      width: 100,
      cellRenderer: 'actionCellRenderer',
      
  }, 
    
  ];
  gridOptions: GridOptions = {
    theme:themeQuartz,
    headerHeight:45,
    rowHeight: 35,
    rowModelType: 'clientSide',  
    pagination: true,            
    paginationPageSize: 10,      
    cacheBlockSize: 20,          
    domLayout: 'autoHeight',
    context: { componentParent: this}, 
    components: {
      actionCellRenderer: ActionCellComponent,
     },
    }
  
  rowData: any[] = [];
  constructor(private apiService: ApiService,private dialog: MatDialog,private router:Router) {}
  ngOnInit(): void {
    this.loadDepartments();
  }
  loadDepartments(): void {
    this.apiService.getAllDepartments().subscribe({
      next: (data) => {
        console.log("Fetched departments:", data);
        this.departments = data;
      },
      error: (error) => {
        this.message = 'Error fetching departments: ' + error.message;
      },
    });
  }
  openDepartmentModal(department?: Department): void {
    
    const dialogRef = this.dialog.open(DepartmentModalComponent, {
      width: '800px',
      data: department || null,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadDepartments(); 
    });
  }
  onEdit(department: Department): void {
    this.openDepartmentModal(department); 
  }
  OnDelete(departmentID: number): void {
    debugger;
      this.apiService.removeDepartmentById(departmentID).subscribe({
        next: () => {
          console.log('Department deleted:', departmentID);
          this.loadDepartments(); 
        },
        error: (err) => {
          console.error('Error deleting department:', err);
        }
      });
    
  }
 
}








