import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';  
import { Department } from '../../models/department';  
import { ApiService } from '../../services/api.service';
import { ColDef, GridOptions,themeQuartz} from 'ag-grid-community';  
import { MatDialog } from '@angular/material/dialog';
import { EmployeemodalComponent} from '../employee-modal/employeemodal.component';
import { ActionCellComponent } from '../action-cell/action-cell.component';
import { ViewFileComponent } from '../view-file/view-file.component';
import { ViewFileCellRendererComponent } from '../view-file-cell-renderer/view-file-cell-renderer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee',
  standalone: false,
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];  
  departments: Department[] = [];  
  newEmployee: Employee = new Employee();  
  selectedEmployee: Employee = new Employee();  
  message: string = '';  

  columnDefs: ColDef[] = [
    { headerName: 'EMPLOYEE ID', field: 'employeeId',width:150},
    { headerName: 'EMPLOYEE NAME', field: 'employeeName',width:170 },
    { headerName: 'EMPLOYEE AGE', field: 'employeeAge',width:150 },
    { headerName: 'EMPLOYEE LOCATION', field: 'employeeLocation',width:180 },
    { headerName: 'EMPLOYEE DOB', field: 'employeeDateOfBirth',width:170 },
    { headerName: 'DEPARTMENT NAME', field: 'departmentName',width:180 },
    {headerName: 'VIEW FILE',field: 'fileName',cellRenderer: 'viewFileCellRenderer',width:150},    
    { headerName: 'ACTIONS',field: 'actions',width: 100,cellRenderer: 'actionCellRenderer'}  
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
      viewFileCellRenderer: ViewFileCellRendererComponent

    },
    };
    rowData: any[] = [];

  constructor(private apiService: ApiService,private dialog: MatDialog,private router:Router) {}
  createViewFileButton(params: any) {
    if (!params.value) return '';
  
    const button = document.createElement('button');
    button.innerHTML = '👁️'; 
    button.style.cursor = 'pointer';
    button.style.border = 'none';
    button.style.background = 'transparent';
    button.addEventListener('click', () => this.openFile(params.value));
  
    return button;
  }
  ngOnInit(): void {
    this.loadEmployees();
    this.loadDepartments(); 
  }
  loadEmployees() {
    this.apiService.getAllEmployees().subscribe({
      next: (data) => {
        console.log('Employees fetched:', data);
        this.employees = data;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      },
      complete: () => {
        console.log('Employee data fetch complete');
      }
    });
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
  
  openFile(employeeId: number) {
    console.log('Opening ViewFileComponent with employeeId:', employeeId);
  
    this.dialog.open(ViewFileComponent, {
      width: '600px',
      data: { employeeId }, 
    });
  }
  
  openEmployeeModal(employee?: Employee): void {
      
      const dialogRef = this.dialog.open(EmployeemodalComponent, {
        width: '800px',
        data: employee || null,
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.loadEmployees(); 
      });
    }
    onEdit(employeeId: number): void {
      const employee = this.employees.find((e) => e.employeeId === employeeId);
      if (employee) {
        this.openEmployeeModal(employee);
      }
    }
    OnDelete(employeeId:number):void{
        this.apiService.removeEmployee(employeeId).subscribe(() => {
            console.log('Department deleted:', employeeId);
            this.loadEmployees(); 
        });
    }
}
