// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user',
//   standalone: false,
  
//   templateUrl: './user.component.html',
//   styleUrl: './user.component.css'
// })
// export class UserComponent {
  
// }
// user.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  rowData: User[] = [];

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', width:150 },
    { field: 'username', headerName: 'Username', width:150 },
    { field: 'role', headerName: 'Role', width:150 },
  ];

  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {
    this.apiservice.getAllUsers().subscribe(data => {
      this.rowData = data;
    });
  }
}
