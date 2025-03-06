// view-file-cell-renderer.component.ts
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { ViewFileComponent } from '../view-file/view-file.component';

@Component({
  selector: 'app-view-file-cell-renderer',
  standalone: false,
  template: `
    <button mat-icon-button (click)="onViewFile()">
      <mat-icon>visibility</mat-icon>
    </button>
  `,
  styles: [`
    button {
      cursor: pointer;
      border: none;
      background: transparent;
    }
  `]
})
export class ViewFileCellRendererComponent implements ICellRendererAngularComp {
  params: any;

  constructor(private dialog: MatDialog) {}

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  onViewFile(): void {
    const employeeId = this.params.data.employeeId; 
    const fileName = this.params.value; 
    if (!employeeId) {
      console.error(" Employee ID is missing in row data.");
      return;
    }
  
    this.dialog.open(ViewFileComponent, {
      width: '600px',
      data: { employeeId, fileName }
    });
  }
  
}
