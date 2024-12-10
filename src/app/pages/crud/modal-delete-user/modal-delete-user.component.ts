import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';
import { NotificationModalComponent } from '../../../components/notification-modal/notification-modal.component';

@Component({
  selector: 'app-modal-delete-user',
  templateUrl: './modal-delete-user.component.html',
  styleUrls: ['./modal-delete-user.component.scss'],
})
export class ModalDeleteUserComponent implements OnInit {
  formUser: FormGroup;
  editMode: boolean = false;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalDeleteUserComponent>,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    this.buildForm();
  }
  //Deletar Usuário
  deleteOnUser() {
    const objUserform: User = this.formUser.getRawValue();
    if (this.data && this.data.name) {
      this.usersService
        .deleteUser(this.data.firebaseId)
        .then(() => {
          this.dialog.open(NotificationModalComponent, {
            data: {
              title: 'Sucesso!',
              message: '- Cliente excluído com sucesso!',
            },
          });
          this.dialogRef.close();
        })

        .catch((err) => {
          this.dialog.open(NotificationModalComponent, {
            data: {
              title: 'Error!',
              message: '- Erro ao excluir o cliente!',
            },
          });
          this.dialogRef.close();
        });
    }
  }

  buildForm() {
    this.formUser = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      cpf: [null, [Validators.required, Validators.minLength(11)]],
      endereco: [null, [Validators.required, Validators.minLength(5)]],
      telefone: [null, [Validators.required, Validators.minLength(11)]],
      email: [null, [Validators.required, Validators.email]],
      healthPlan: [''],
      dentalPlan: [''],
    });
    if (this.data && this.data.name) {
      this.fillForm();
    }
  }
  fillForm() {
    this.formUser.patchValue({
      name: this.data.name,
      cpf: this.data.cpf,
      endereco: this.data.endereco,
      telefone: this.data.telefone,
      email: this.data.email,
      healthPlan: this.data.healthPlan,
      dentalPlan: this.data.dentalPlan,
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
}
