import { Component, Inject } from '@angular/core';
import { User } from '../../../interfaces/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-modal-view-users',
  templateUrl: './modal-view-users.component.html',
  styleUrl: './modal-view-users.component.scss',
})
export class ModalViewUsersComponent {
  userData: User;
  constructor(
    public diaLogRef: MatDialogRef<ModalViewUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userData = data;
    console.log(this.userData);
  }

  closeModal() {
    this.diaLogRef.close();
  }
}
