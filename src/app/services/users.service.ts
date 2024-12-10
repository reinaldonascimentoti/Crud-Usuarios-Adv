import { importProvidersFrom, Injectable } from '@angular/core';
importProvidersFrom;
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../interfaces/user';
import { Processo } from '../interfaces/processos';
import { forkJoin, from, map, mergeMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  getAllProcessos() {
    throw new Error('Method not implemented.');
  }
  constructor(private dataBaseStore: AngularFirestore) {}

  getAllUsers() {
    return this.dataBaseStore
      .collection('users', (ref) => ref.orderBy('name'))
      .valueChanges({ idField: 'firebaseId' }) as Observable<any[]>;
  }

  getUserByCpfAndName(
    cpf: string
  ): Observable<{ firebaseId: string; name: string } | undefined> {
    return this.dataBaseStore
      .collection<User>('users', (ref) => ref.where('cpf', '==', cpf))
      .valueChanges({ idField: 'firebaseId' }) // Inclui o firebaseId nos resultados
      .pipe(
        map((users) => {
          if (users.length > 0) {
            return {
              firebaseId: users[0].firebaseId, // ID do usuário
              name: users[0].name, // Nome do usuário
            };
          }
          return undefined; // Retorna undefined se nenhum usuário for encontrado
        })
      );
  }

  addUser(user: User) {
    return this.dataBaseStore.collection('users').add(user);
  }

  updateUser(firebaseId: string, user: User) {
    return this.dataBaseStore.collection('users').doc(firebaseId).update(user);
  }

  deleteUser(userId: string) {
    return this.dataBaseStore.collection('users').doc(userId).delete();
  }
}
