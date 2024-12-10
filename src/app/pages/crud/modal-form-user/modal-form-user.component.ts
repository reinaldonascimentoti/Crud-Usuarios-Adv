import { Component, Inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { cp } from 'fs';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss',
})
export class ModalFormUserComponent {
  formUser: FormGroup;
  editMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalFormUserComponent>,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    this.buildForm();
    if (this.data && this.data.name) {
      this.editMode = true;
    }
  }
  //Salvar Usuário
  saveUser() {
    const objUserform: User = this.formUser.getRawValue();
    if (this.data && this.data.name) {
      this.usersService
        .updateUser(this.data.firebaseId, objUserform)
        .then((response: any) => {
          alert('Usuário editado com sucesso');
          this.closeModal();
        })
        .catch((err) => {
          alert('Erro ao editar o usuário');
          console.log(err);
        });
    } else {
      this.usersService
        .addUser(objUserform)
        .then((response: any) => {
          alert('Usuário salvo com sucesso');
          this.closeModal();
        })
        .catch((err) => {
          alert('Erro ao salvar o usuário');
          console.log(err);
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
