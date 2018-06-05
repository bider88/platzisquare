import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from '../../services/autorizacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  pass: string = '';

  constructor(
    private autorizacionService: AutorizacionService
  ) { }

  ngOnInit() {
  }

  login() {
    this.autorizacionService.login(this.email, this.pass);
  }
  loginFacebook() {
    this.autorizacionService.loginFacebook();
  }
}
