import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';  
import { throwError } from 'rxjs';  
import { Department } from '../models/department';
import { Employee } from '../models/employee';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

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

  updateEmployee(employeeId: number, employee: Employee, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append("employeeId", employeeId.toString());
    formData.append("EmployeeName", employee.employeeName);
    formData.append("EmployeeAge", employee.employeeAge.toString());
    formData.append("EmployeeLocation", employee.employeeLocation);
    const dob = new Date(employee.employeeDateOfBirth);
    if (!isNaN(dob.getTime())) {
      formData.append("EmployeeDateOfBirth", dob.toISOString());
    } else {
      console.error("Invalid Date:", employee.employeeDateOfBirth);
    }    formData.append("DepartmentId", employee.departmentId.toString());
  
    if (file) {
      formData.append("file", file);
    }
  
    return this.http.put(`${this.apiUrl}/UpdateEmployeeById`, formData);
  }
  
  removeEmployee(employeeId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/RemoveEmployeeById?employeeId=${employeeId}`);
  }
  
  uploadFile(employeeId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file); 
  
    console.log(" Uploading File:", file);
    console.log(" FormData Contents:", formData.get("file"));
  
    return this.http.post(`${this.apiUrl}/UploadEmployeeFile/${employeeId}`, formData, {
      headers: new HttpHeaders({ "enctype": "multipart/form-data" }), 
      reportProgress: true,
      observe: "events",
    });
  }
  getemployeeById(employeeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetEmployeeById/${employeeId}`);
  }
  getEmployeeFile(employeeId: number): Observable<any> {
    return this.http.get<{ fileUrl: string }>(`${this.apiUrl}/GetEmployeeFile/${employeeId}`);
  }
  
  getBackendVersion(): Observable<{ version: string }> {
    return this.http.get<{ version: string }>(`${this.apiUrl}/api/version`);
  }
  login(data: any): Observable<any> {
    return this.http.post('http://localhost:5081/login', data, {withCredentials: true});
  }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/GetAllUsers`);
  }
 
  
}
