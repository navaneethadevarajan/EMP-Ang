// import { Component } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-unauthorized-dialog',
//   standalone: false,
//   templateUrl: './unauthorized-dialog.component.html',
//   styleUrl: './unauthorized-dialog.component.css'
// })
// export class UnauthorizedDialogComponent {
//   constructor(public dialogRef: MatDialogRef<UnauthorizedDialogComponent>) {}

// }


import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unauthorized-dialog',
  standalone: false,
  templateUrl: './unauthorized-dialog.component.html',
  styleUrls: ['./unauthorized-dialog.component.css']
})
export class UnauthorizedDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UnauthorizedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}
}

