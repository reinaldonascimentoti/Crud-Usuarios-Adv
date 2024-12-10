import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcessoService } from '../../../../services/processo.service';
import { Processo, User } from '../../../../interfaces/user';
import { UsersService } from '../../../../services/users.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-form-process',
  templateUrl: './modal-form-process.component.html',
  styleUrls: ['./modal-form-process.component.scss'],
  providers: [DatePipe], // Adicione o DatePipe como provider
})
export class ModalFormProcessoComponent {
  processoForm: FormGroup;
  clienteNome: string = '';
  userId: string | null = null; // Para armazenar o ID do usuário

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalFormProcessoComponent>,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private usersService: UsersService,
    private processoService: ProcessoService
  ) {
    this.processoForm = this.fb.group({
      numeroProcesso: ['', Validators.required],
      dataAbertura: ['', Validators.required],
      tipo: ['', Validators.required],
      cpf: ['', Validators.required],
      descricao: [''],
    });
  }
  private convertDateForFirestore(dateValue: string | null): string {
    if (dateValue) {
      const date = new Date(dateValue);
      // Formata a data para dd/MM/yyyy
      return this.datePipe.transform(date, 'dd/MM/yyyy') || ''; // Garante que retorne uma string
    }
    return ''; // Retorna uma string vazia se dateValue for null
  }
  buscarNomeCliente() {
    const cpf = this.processoForm.get('cpf')?.value;
    if (cpf) {
      this.usersService.getUserByCpfAndName(cpf).subscribe({
        next: (userData) => {
          if (userData) {
            this.userId = userData.firebaseId; // Armazena o ID do usuário como string
            this.clienteNome = userData.name; // Armazena o nome do usuário como string
            console.log('ID do usuário encontrado:', this.userId);
            console.log('Nome do cliente encontrado:', this.clienteNome);
          } else {
            this.clienteNome = 'Cliente não encontrado';
            this.userId = null; // Reseta o userId se não encontrar
          }
        },
        error: (err) => {
          console.error(err);
          this.clienteNome = 'Erro ao buscar cliente';
          this.userId = null; // Reseta o userId em caso de erro
        },
      });
    } else {
      this.clienteNome = '';
      this.userId = null; // Reseta o userId se não houver CPF
    }
  }
  onSubmit(): void {
    if (this.processoForm.valid && this.userId) {
      const novoProcesso = {
        ...this.processoForm.value,
        userId: this.userId, // Associando o processo ao usuário encontrado
        dataAbertura: this.convertDateForFirestore(
          this.processoForm.get('dataAbertura')?.value
        ),
      };
      this.processoService
        .createProcesso(this.userId, novoProcesso)
        .then((docRef) => {
          console.log('Processo criado com ID:', docRef.id);
        })
        .catch((error) => {
          console.error('Erro ao criar processo:', error);
        });

      this.dialogRef.close(novoProcesso);
    } else {
      console.error('Erro: Formulário inválido ou usuário não encontrado.');
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
