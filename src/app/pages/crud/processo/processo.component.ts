import { Component, OnInit, ViewChild } from '@angular/core';
import { Processo, ProcessosResponse, User } from '../../../interfaces/user';
import { ProcessoService } from '../../../services/processo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ModalViewUsersComponent } from '../modal-view-users/modal-view-users.component';
import { ModalFormUserComponent } from '../modal-form-user/modal-form-user.component';
import { UsersService } from '../../../services/users.service';
import { ModalFormProcessoComponent } from './modal-form-process/modal-form-process.component';
import { ModalEditProcessComponent } from './modal-edit-process/modal-edit-process.component';
import { DeleteProcessComponent } from './modal-delete-process/modal-delete-process.component';
import { ModalViewProcessComponent } from './modal-view-process/modal-view-process.component';
import { cp } from 'fs';

@Component({
  selector: 'app-processo',
  templateUrl: './processo.component.html',
  styleUrls: ['./processo.component.scss'],
})
export class ProcessoComponent implements OnInit {
  // Definindo o tipo dos dados que serão armazenados
  displayedColumns: string[] = [
    'numeroProcesso',
    'dataAbertura',
    'tipo',
    'processo',
    'nome',
    'cpf',
    'acoes',
  ];
  dadosCompletosProc: ProcessosResponse = { user: null, processos: [] };
  userId: string;
  users: User[] = [];
  user: User; // Modelo de usuário
  dadosCompletos: { user: User; processos: Processo[] }[] = [];
  dataSource: MatTableDataSource<{ user: User; processos: Processo[] }> =
    new MatTableDataSource<{ user: User; processos: Processo[] }>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  processo: Processo;

  constructor(
    private processoService: ProcessoService,
    public dialog: MatDialog,

    private usersService: UsersService // Injeta o UserService
  ) {}

  ngOnInit(): void {
    this.getListProcessos();
  }

  getListProcessos() {
    this.processoService.getAllProcessos().subscribe({
      next: (response: any) => {
        console.log('Lista :', response);
        this.dadosCompletos = response;
        this.dataSource.data = this.dadosCompletos; // Atualiza dataSource
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
          switch (sortHeaderId) {
            case 'numeroProcesso':
              return data.processos[0]?.numeroProcesso;
            case 'dataAbertura':
              return data.processos[0]?.dataAbertura;
            case 'tipo':
              return data.processos[0]?.tipo;
            case 'nome':
              return data.user.name;
            case 'cpf':
              return data.user.cpf;
            case 'processo':
              return data.processos.some(
                (processo) => processo.status === 'Em andamento'
              )
                ? 1
                : 0;
            default:
              return '';
          }
        };
      },
      error: (err) => {
        console.log(err);
        // Aqui pode adicionar um feedback visual para o usuário
      },
    });
  }
  openModalViewProcesso(processos: any): void {
    this.dialog.open(ModalViewProcessComponent, {
      width: '850px',
      height: '450px',
      data: processos,
    });
  }

  openModalFormProcesso() {
    const dialogRef = this.dialog.open(ModalFormProcessoComponent, {
      width: '600px',
      data: {}, // Pode passar um objeto vazio, pois não temos um usuário ainda
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getListProcessos(); // Atualiza a lista de processos após o cadastro
      }
    });
  }
  openModalEditProcesso(
    firebaseId: string,
    processoId: string,
    processo: Processo
  ): void {
    console.log('Processo', processo);
    console.log('firebaseId', firebaseId);
    console.log('processoId', processoId);
    const dialogRef = this.dialog.open(ModalEditProcessComponent, {
      width: '800px',
      data: { firebaseId, processoId, processo },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getListProcessos(); // Atualiza a lista de processos após a edição
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // In the parent component
  openDeleteModal(user: User, processo: Processo) {
    console.log('Processo para deletar', processo);
    console.log('User', user);
    const dialogRef = this.dialog.open(DeleteProcessComponent, {
      width: '800px',
      height: '415px',
      data: {
        user: user,
        processo: processo,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getListProcessos();
      }
    });
  }
}
