import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './components/department/department.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';  
import { ClientSideRowModelModule } from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActionCellComponent } from './components/action-cell/action-cell.component';
import { DepartmentModalComponent } from './components/department-modal/department-modal.component';
import { EmployeemodalComponent } from './components/employee-modal/employeemodal.component';
import { RouterModule } from '@angular/router';
import { MatOption } from '@angular/material/core';
import { HeaderComponent } from './header/header.component';
import {MatToolbar} from '@angular/material/toolbar';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { BacktomenuComponent } from './backtomenu/backtomenu.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { ViewFileComponent } from './components/view-file/view-file.component';
import { ViewFileCellRendererComponent } from './components/view-file-cell-renderer/view-file-cell-renderer.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt.interceptor';
import { UserComponent } from './components/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UnauthorizedDialogComponent } from './components/unauthorized-dialog/unauthorized-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    EmployeeComponent,
    ActionCellComponent,
    DepartmentModalComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    BacktomenuComponent,
    EmployeemodalComponent,
    ViewFileComponent,
    SafeUrlPipe,
    ViewFileCellRendererComponent,
    LoginComponent,
    UserComponent,
    UnauthorizedDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    AgGridModule,
    MatButtonModule,      
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule ,
    MatDialogModule,
    RouterModule,
    MatOption,
    MatToolbar,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDatepickerToggle,
    MatMenuModule,
    BrowserModule,
    BrowserAnimationsModule, // Required for toast animations
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MatSnackBarModule,
    
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync()
  ],
  
  bootstrap: [AppComponent],

})
export class AppModule {
  constructor() {
    ModuleRegistry.registerModules([ClientSideRowModelModule]);
  }
 }
