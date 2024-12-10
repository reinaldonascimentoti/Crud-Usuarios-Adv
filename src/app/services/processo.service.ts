// src/app/services/processo.service.ts
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentData,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable, combineLatest, forkJoin, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Processo, ProcessosResponse, User } from '../interfaces/user';
import { collection, doc, Timestamp, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProcessoService {
  constructor(private firestore: AngularFirestore) {}

  // Listar todos os usuários
  getAllUsers(): Observable<User[]> {
    return this.firestore
      .collection<User>('users')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          const users = actions.map((a) => {
            const data = a.payload.doc.data() as User;
            const firebaseId = a.payload.doc.id;
            return { firebaseId, ...data };
          });
          console.log('Usuários carregados no serviço:', users); // Log para verificar usuários carregados
          return users;
        }),
        catchError((error) => {
          console.error('Erro ao carregar usuários:', error);
          return of([]); // Retorna um array vazio em caso de erro
        })
      );
  }
  // Listar todos os processos para todos os usuários
  getAllProcessos(): Observable<{ user: User; processos: Processo[] }[]> {
    return this.getAllUsers().pipe(
      mergeMap((users) => {
        if (users.length === 0) {
          console.log('Nenhum usuário encontrado.');
          return of([]); // Retorna um array vazio se não houver usuários
        }

        const processosObservables = users.map((user) => {
          return this.firestore
            .collection(`users/${user.firebaseId}/processos`)
            .snapshotChanges()
            .pipe(
              map((actions) => {
                const processos = actions.map((a) => {
                  const data = a.payload.doc.data() as Processo;
                  const processoId = a.payload.doc.id;
                  return {
                    processoId,
                    ...data,
                  };
                });
                console.log(
                  `Processos carregados para o usuário ${user.name} - CPF ${user.cpf}:`,
                  processos
                ); // Log para verificar processos por usuário
                return { user, processos }; // Mantemos a estrutura esperada
              }),
              catchError((error) => {
                console.error(
                  `Erro ao carregar processos para o usuário ${user.firebaseId}:`,
                  error
                );
                return of({ user, processos: [] }); // Retorna um objeto com processos vazios em caso de erro
              })
            );
        });

        // Combina todos os observáveis de processos em um único array
        return combineLatest(processosObservables).pipe(
          map((dados) => {
            // Filtra para retornar apenas usuários que têm processos
            const usuariosComProcessos = dados.filter(
              (dado) => dado.processos.length > 0
            );
            console.log('Usuários com processos:', usuariosComProcessos); // Log para verificar usuários com processos
            return usuariosComProcessos; // Retorna apenas usuários com processos
          })
        );
      }),
      catchError((error) => {
        console.error('Erro ao carregar processos:', error);
        return of([]); // Retorna um array vazio em caso de erro
      })
    );
  }

  getProcessosByUserId(userId: string): Observable<ProcessosResponse> {
    return this.firestore
      .doc<User>(`users/${userId}`)
      .valueChanges()
      .pipe(
        mergeMap((user) => {
          if (!user) {
            console.log(`Usuário com ID ${userId} não encontrado.`);
            return of({ user: null, processos: [] }); // Retorna um objeto vazio se o usuário não for encontrado
          }
          return this.firestore
            .collection<Processo>(`users/${userId}/processos`)
            .snapshotChanges()
            .pipe(
              map((actions) => {
                const processos = actions.map((a) => {
                  const data = a.payload.doc.data() as Processo;
                  const processoId = a.payload.doc.id;
                  return {
                    processoId,
                    ...data,
                  };
                });
                console.log(
                  `Processos carregados para o usuário ${user.name} - CPF ${user.cpf}:`,
                  processos
                );
                return { user, processos }; // Retorna o usuário e seus processos
              }),
              catchError((error) => {
                console.error(
                  `Erro ao carregar processos para o usuário ${userId}:`,
                  error
                );
                return of({ user, processos: [] }); // Retorna um objeto com processos vazios em caso de erro
              })
            );
        }),
        catchError((error) => {
          console.error('Erro ao carregar o usuário:', error);
          return of({ user: null, processos: [] }); // Retorna um objeto vazio em caso de erro
        })
      );
  }
  createProcesso(
    userId: string,
    processo: Processo
  ): Promise<DocumentReference<Processo>> {
    // Adiciona o processo na subcoleção 'processos' do usuário específico
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection<Processo>('processos')
      .add(processo);
  }
  editProcesso(
    userId: string,
    processoId: string,
    processo: Processo
  ): Promise<void> {
    console.log('editProcesso - userId:', userId); // Log do userId
    console.log('editProcesso - processoId:', processoId); // Log do processoId
    console.log('editProcesso - processo:', processo); // Log do objeto processo

    const docRef = this.firestore.doc(
      `users/${userId}/processos/${processoId}`
    ).ref;
    return updateDoc(docRef, { ...processo });
  }

  deleteProcesso(firebaseId: string, processoId: string) {
    console.log('deleteProcesso - firebaseId:', firebaseId); // Log do firebaseId
    console.log('deleteProcesso - processoId:', processoId); // Log do processoId
    return this.firestore
      .collection('users')
      .doc(firebaseId)
      .collection('processos')
      .doc(processoId)
      .delete();
  }
}
