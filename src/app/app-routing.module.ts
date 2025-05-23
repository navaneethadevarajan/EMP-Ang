import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './components/department/department.component';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ActionCellComponent } from './components/action-cell/action-cell.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './components/user/user.component';

// const routes: Routes = [
//   // { path: '', component: MenuComponent },
//  { path: 'login', component: LoginComponent}, // Login route
//  { path: 'employees', component: EmployeeComponent },
//  { path: 'departments', component: DepartmentComponent },
//  { path: 'user', component: UserComponent },
//  { path: 'actioncell',component:ActionCellComponent},
//  { path: 'menu', component: MenuComponent },
//  { path: '', redirectTo: '/menu', pathMatch: 'full' }, // Default route to menu or home
// ];
const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] }, 
  { path: 'employees', component: EmployeeComponent, canActivate: [AuthGuard] }, 
  { path: 'departments', component: DepartmentComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Admin'] } }, // Only Admin
  { path: 'actioncell', component: ActionCellComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
