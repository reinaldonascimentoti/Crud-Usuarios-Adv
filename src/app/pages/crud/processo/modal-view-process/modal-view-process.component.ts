import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-view-process',
  templateUrl: './modal-view-process.component.html',
  styleUrl: './modal-view-process.component.scss',
})
export class ModalViewProcessComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalViewProcessComponent>
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
