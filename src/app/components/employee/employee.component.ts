import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';  
import { Department } from '../../models/department';  
import { ApiService } from '../../services/api.service';
import { ColDef, GridOptions} from 'ag-grid-community';  
import { MatDialog } from '@angular/material/dialog';
import { EmployeemodalComponent} from '../employee-modal/employeemodal.component';
import { ActionCellComponent } from '../action-cell/action-cell.component';
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
    { headerName: 'Employee ID', field: 'employeeId' },
    { headerName: 'Employee Name', field: 'employeeName' },
    { headerName: 'Employee Age', field: 'employeeAge' },
    { headerName: 'Employee Location', field: 'employeeLocation' },
    { headerName: 'Employee Date of Birth', field: 'employeeDateOfBirth' },
    { headerName: 'Department Name', field: 'departmentName' },
    { headerName: 'Actions',field: 'actions',width: 100,cellRenderer: 'actionCellRenderer',}  
  ];
  gridOptions: GridOptions = {
    rowHeight: 40,
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
