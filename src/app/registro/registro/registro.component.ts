import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from '../../services/autorizacion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email: string = 'bider88@mail.com';
  pass: string = 'holahola';

  constructor(
    private autorizacionService: AutorizacionService
  ) { }

  ngOnInit() {
  }

  registrar() {
    this.autorizacionService.registro(this.email, this.pass);
  }

}
