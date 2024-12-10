import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Processo, User } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { publicDecrypt } from 'crypto';
import { MatDialog } from '@angular/material/dialog';
import { ModalViewUsersComponent } from './modal-view-users/modal-view-users.component';
import { ModalFormUserComponent } from './modal-form-user/modal-form-user.component';
import { ModalDeleteUserComponent } from './modal-delete-user/modal-delete-user.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'role',
    'benefits',
    'action',
  ];
  dataSource: any;
  listusers: User[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersService: UsersService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>(this.listusers);
  }
  ngOnInit() {
    this.getListUsers();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getListUsers() {
    this.usersService.getAllUsers().subscribe({
      next: (response: any) => {
        console.log('Lista :', response);
        this.listusers = response;
        this.dataSource = new MatTableDataSource<any>(this.listusers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //Logica do Modal
  openModalUser(user: User) {
    this.dialog.open(ModalViewUsersComponent, {
      width: '850px',
      height: '450px',
      data: user,
    });
  }
  openModaAddUser() {
    this.dialog
      .open(ModalFormUserComponent, {
        width: '800px',
        height: '400px',
      })
      .afterClosed()
      .subscribe((result) => {
        this.getListUsers();
      });
  }
  openModalEditUser(user: User) {
    this.dialog
      .open(ModalFormUserComponent, {
        width: '800px',
        height: '400px',
        data: user,
      })
      .afterClosed()
      .subscribe((result) => {
        this.getListUsers();
      });
  }
  openModalDeleteUser(user: User) {
    this.dialog
      .open(ModalDeleteUserComponent, {
        width: '800px',
        height: '400px',
        data: user,
      })
      .afterClosed()
      .subscribe((result) => {
        this.getListUsers();
      });
  }
}
