import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { ProcessoService } from '../../../../services/processo.service';
import { NotificationModalComponent } from '../../../../components/notification-modal/notification-modal.component';
import { Processo, User } from '../../../../interfaces/user';

@Component({
  selector: 'app-delete-process',
  templateUrl: './modal-delete-process.component.html',
  styleUrls: ['./modal-delete-process.component.scss'],
})
export class DeleteProcessComponent implements OnInit {
  formProcesso: FormGroup;
  formUser: FormGroup;
  processo: Processo;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteProcessComponent>,
    private formBuilder: FormBuilder,
    private processoService: ProcessoService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      processo: Processo;
      user: User;
    }
  ) {}

  ngOnInit() {
    this.buildForm();
    this.buildFormUser();
    this.fillFormUser();

    if (this.data && this.data.processo) {
      this.processo = this.data.processo;
      this.fillForm();
    }
  }

  deleteOnProcess() {
    console.log('FirebaseId', this.data.user.firebaseId);
    console.log('ProcessoId', this.data.processo.processoId);
    const objProcessoform: Processo = this.formProcesso.getRawValue();
    const objUserform: User = this.formUser.getRawValue();
    if (this.data.user.firebaseId && this.data.processo.processoId) {
      this.processoService
        .deleteProcesso(
          this.data.user.firebaseId,
          this.data.processo.processoId
        )
        .then(() => {
          this.dialog.open(NotificationModalComponent, {
            data: {
              title: 'Sucesso!',
              message: 'Processo excluído com sucesso!',
            },
          });
          this.dialogRef.close(true);
        })
        .catch((err) => {
          this.dialog.open(NotificationModalComponent, {
            data: {
              title: 'Erro!',
              message: 'Erro ao excluir o Processo!',
            },
          });
          this.dialogRef.close(false);
        });
    }
  }

  buildForm() {
    this.formProcesso = this.formBuilder.group({
      firebaseId: [{ value: '', disabled: false }, Validators.required],
      processoId: [{ value: '', disabled: false }, Validators.required],
      numeroProcesso: [{ value: '', disabled: false }, Validators.required],
      dataAbertura: [{ value: '', disabled: false }, Validators.required],
      tipo: [{ value: '', disabled: false }, Validators.required],
      status: [{ value: '', disabled: false }, Validators.required],
      descricao: [{ value: '', disabled: false }, Validators.required],
    });
  }

  fillForm() {
    if (this.processo) {
      const options: Intl.DateTimeFormatOptions = { dateStyle: 'short' };
      const dateFormatter = new Intl.DateTimeFormat('pt-BR', options);
      this.formProcesso.patchValue({
        firebaseId: this.data.user.firebaseId,
        processoId: this.processo.processoId,
        numeroProcesso: this.processo.numeroProcesso,
        dataAbertura: dateFormatter.format(
          new Date(this.processo.dataAbertura)
        ),
        tipo: this.processo.tipo,
        status: this.processo.status,
        descricao: this.processo.descricao,
      });
    }
  }
  buildFormUser() {
    this.formUser = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      cpf: [null, [Validators.required, Validators.minLength(11)]],
    });
  }
  fillFormUser() {
    this.formUser.patchValue({
      name: this.data.user.name,
      cpf: this.data.user.cpf,
    });
  }
  closeModal() {
    this.dialogRef.close(false);
  }
}
