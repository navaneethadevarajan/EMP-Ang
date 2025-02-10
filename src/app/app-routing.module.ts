import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './components/department/department.component';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ActionCellComponent } from './components/action-cell/action-cell.component';
import { MenuComponent } from './menu/menu.component';
const routes: Routes = [
  // { path: '', component: MenuComponent },
 { path: 'employees', component: EmployeeComponent },
 { path: 'departments', component: DepartmentComponent },
 { path: 'actioncell',component:ActionCellComponent},
 { path: 'menu', component: MenuComponent },
 { path: '', redirectTo: '/menu', pathMatch: 'full' }, // Default route to menu or home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
