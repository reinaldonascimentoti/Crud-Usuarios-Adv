import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss'],
})
export class NotificationModalComponent {
  onCancelCalled: boolean;
  constructor(
    public dialogRef: MatDialogRef<NotificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}
  isSuccess(): boolean {
    return this.data.title === 'Sucesso!';
  }

  isError(): boolean {
    return this.data.title === 'Erro!';
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
