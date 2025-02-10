import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';  
import { throwError } from 'rxjs';  
import { Department } from '../models/department';
import { Employee } from '../models/employee';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  private apiUrl = 'http://localhost:5081';

  constructor(private http: HttpClient) {}

  createDepartment(department: Department): Observable<any> {
    return this.http.post(`${this.apiUrl}/CreateDepartment`, department).pipe(
      catchError((error) => {
        console.error('Error creating department:', error); 
        return throwError(() =>
          new Error('Error creating department: ' + (error.error?.message || error.message))
        );
      })
    );
  }
  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/GetAllDept`).pipe(
      catchError((error) => {
        console.error('Error fetching departments:', error);
        return throwError(() =>
          new Error('Error fetching departments: ' + (error.error?.message || error.message))
        );
      })
    );
  }
  updateDepartmentById(departmentId: number, updatedDepartment: Department): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateDepartmentById?departmentId=${departmentId}`, updatedDepartment);
  }

  removeDepartmentById(departmentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/RemoveDepartmentById?departmentId=${departmentId}`).pipe(
      catchError((error) => {
        console.error('Error removing department:', error);
        return throwError(() =>
          new Error('Error removing department: ' + (error.error?.message || error.message))
        );
      })
    );
  }
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/GetAllEmp`);
  }

  getEmployeesByDeptId(departmentId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/GetEmployeesByDeptId/${departmentId}`);
  }

  createEmployee(employee: Employee): Observable<any> {
    return this.http.post(`${this.apiUrl}/CreateEmployee`, employee);
  }

  updateEmployee(employeeId: number, employee: Employee): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateEmployeeById?employeeId=${employeeId}`, employee);
  }

  removeEmployee(employeeId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/RemoveEmployeeById?employeeId=${employeeId}`);
  }
}