import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { ResaltarDirective } from './directives/resaltar.directive';
import { ContarClicksDirective } from './directives/contar-clicks.directive';
import { LugaresComponent } from './lugares/lugares.component';
import { DetalleComponent } from './detalle/detalle.component';
import { AppRoutingModule } from './/app-routing.module';
import { ContactoComponent } from './contacto/contacto.component';

import { LugaresService } from './services/lugares.service';
import { AutorizacionService } from './services/autorizacion.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CrearComponent } from './crear/crear.component';
import { LinkifystrPipe } from './pipes/linkifystr.pipe';
import { LoginComponent } from './login/login/login.component';
import { RegistroComponent } from './registro/registro/registro.component';
import { MyGuardService } from './services/my-guard.service';

// AIzaSyDs1n4Vpww6KY0GcFhRd6P_DJiehYiAISU  27 dic. 2017
// AIzaSyDlWgQDIrvq254gOmTmOicdKKAfjzt671Y  28 dic. 2017
export const firebaseConfig = {
  apiKey: 'AIzaSyDs1n4Vpww6KY0GcFhRd6P_DJiehYiAISU',
  authDomain: 'platzisquare-8308c.firebaseapp.com',
  databaseURL: 'https://platzisquare-8308c.firebaseio.com',
  storageBucket: 'platzisquare-8308c.appspot.com',
  messagingSenderId: '937832260655'
};

@NgModule({
  declarations: [
    AppComponent,
    ResaltarDirective,
    ContarClicksDirective,
    LugaresComponent,
    DetalleComponent,
    ContactoComponent,
    CrearComponent,
    LinkifystrPipe,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAJxqColZDKizmpCmI1bJhJi5etaa9IjdM',
      libraries: ['places']
    }),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    LugaresService,
    AutorizacionService,
    MyGuardService,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
