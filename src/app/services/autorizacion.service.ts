import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable()
export class AutorizacionService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.isLogged();
  }

  loginFacebook() {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(result => {
        console.log(result);
        alert('Sesión iniciada con Facebook');
        this.router.navigate(['lugares']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  login = (email, password) => {
    // console.log('login');
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        alert('Sesión iniciada');
        this.router.navigate(['lugares']);
        // console.log(response);
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          alert('Correo electrónico incorrecto');
        } else if (error.code === 'auth/wrong-password') {
          alert('Contraseña incorrecta');
        } else {
          alert(`Error: ${error.message}`);
        }
      });
  }

  registro = (email, password) => {
    // console.log('registro');
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        alert('Usuario registrado');
        // console.log(response);
      })
      .catch((error) => {
        alert('Ha ocurrido un error');
        console.log(error.message);
      });
  }

  isLogged () {
    return this.angularFireAuth.authState;
  }

  logout() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['lugares']);
  }

  getUser() {
    return this.angularFireAuth.auth.currentUser;
  }

}
