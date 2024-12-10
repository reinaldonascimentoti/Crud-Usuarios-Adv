import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from './components/button/button.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment.development';
import { CrudComponent } from './pages/crud/crud.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularFireModule } from '@angular/fire/compat';
import { ModalViewUsersComponent } from './pages/crud/modal-view-users/modal-view-users.component';
import { ModalFormUserComponent } from './pages/crud/modal-form-user/modal-form-user.component';

import { ProcessoComponent } from './pages/crud/processo/processo.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ModalFormProcessoComponent } from './pages/crud/processo/modal-form-process/modal-form-process.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ModalEditProcessComponent } from './pages/crud/processo/modal-edit-process/modal-edit-process.component';
import { NotificationModalComponent } from './components/notification-modal/notification-modal.component';

import { ModalViewProcessComponent } from './pages/crud/processo/modal-view-process/modal-view-process.component';
import { DeleteProcessComponent } from './pages/crud/processo/modal-delete-process/modal-delete-process.component';
import { ModalDeleteUserComponent } from './pages/crud/modal-delete-user/modal-delete-user.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    CrudComponent,
    ModalViewUsersComponent,
    ModalFormUserComponent,
    ModalDeleteUserComponent,
    ProcessoComponent,
    ModalViewProcessComponent,
    ModalFormProcessoComponent,
    ModalEditProcessComponent,
    NotificationModalComponent,
    DeleteProcessComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    //provideFirebaseApp(() =>
    //   initializeApp({
    //      projectId: 'crud-adv',
    //       appId: '1:9556583805:web:d604f44fdbaac4f86b1814',
    //      storageBucket: 'crud-adv.firebasestorage.app',
    //     apiKey: 'AIzaSyAIvbh3oLuaehrxLcT9DnY1CrxG3aDXmJ4',
    //      authDomain: 'crud-adv.firebaseapp.com',
    //      messagingSenderId: '9556583805',
    //     measurementId: 'G-FFH3QE1LBR',
    //    })
    //   ),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
