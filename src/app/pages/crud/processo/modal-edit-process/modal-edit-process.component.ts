import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { ProcessoService } from '../../../../services/processo.service';
import { Processo, User } from '../../../../interfaces/user';
import { Timestamp } from '@angular/fire/firestore';
import { NotificationModalComponent } from '../../../../components/notification-modal/notification-modal.component';

@Component({
  selector: 'app-modal-edit-process',
  templateUrl: './modal-edit-process.component.html',
  styleUrls: ['./modal-edit-process.component.scss'],
})
export class ModalEditProcessComponent {
  editProcessoForm: FormGroup;
  private onCancelCalled: boolean = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private processoService: ProcessoService,
    public dialogRef: MatDialogRef<ModalEditProcessComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      firebaseId: string;
      userId: string;
      name: string;
      processoId: string;
      user: User;
      processo: Processo;
    }
  ) {
    this.editProcessoForm = this.fb.group({
      numeroProcesso: [data.processo.numeroProcesso, Validators.required],
      tipo: [data.processo.tipo, Validators.required],
      status: [data.processo.status, Validators.required],
      descricao: [data.processo.descricao, Validators.required],
      dataAbertura: [
        this.isTimestamp(data.processo.dataAbertura)
          ? data.processo.dataAbertura.toDate() // Converte para Date
          : new Date(data.processo.dataAbertura), // Converte para Date se já for uma string
        Validators.required,
      ],
    });
    console.log('userId no ModalEdit:', data.processo.userId);
    console.log('processoId no ModalEdit:', data.processo.processoId);
  }

  private isTimestamp(value: any): value is Timestamp {
    return (
      value &&
      typeof value === 'object' &&
      'seconds' in value &&
      'nanoseconds' in value
    );
  }

  onSubmit(): void {
    if (
      this.editProcessoForm.valid &&
      this.isFormModified() &&
      !this.onCancelCalled
    ) {
      const processoData = this.editProcessoForm.value;
      // Verifica se dataAbertura é um objeto Date e converte para string
      if (processoData.dataAbertura instanceof Date) {
        processoData.dataAbertura = processoData.dataAbertura.toISOString(); // Converte para string ISO
      }
      if (this.data.processo.processoId !== undefined) {
        this.processoService
          .editProcesso(
            this.data.processo.userId,
            this.data.processo.processoId,
            processoData
          )
          .then(() => {
            if (!this.onCancelCalled) {
              this.dialog.open(NotificationModalComponent, {
                data: {
                  title: 'Sucesso!',
                  message: '- Processo atualizado com sucesso!',
                },
              });
              this.dialogRef.close();
            }
          })
          .catch((err) => {
            console.error('- Erro ao editar o processo:', err);
            // Abre o modal de erro
            this.dialog.open(NotificationModalComponent, {
              data: {
                title: 'Erro!',
                message:
                  'Ocorreu um erro ao atualizar o processo. Tente novamente.',
              },
            });
          });
      } else {
        console.error('processoId is undefined');
      }
    } else {
      this.dialogRef.close();
    }
  }

  private isFormModified(): boolean {
    const formValue = this.editProcessoForm.value;
    return (
      formValue.numeroProcesso !== this.data.processo.numeroProcesso ||
      formValue.tipo !== this.data.processo.tipo ||
      formValue.status !== this.data.processo.status ||
      formValue.descricao !== this.data.processo.descricao ||
      formValue.dataAbertura !== this.data.processo.dataAbertura.toString()
    );
  }

  onCancel(): void {
    this.onCancelCalled = true;
    this.dialogRef.close(false);
  }
}
