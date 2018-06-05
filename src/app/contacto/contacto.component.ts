import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  lat: Number = 19.0722215;
  lng: Number = -98.2951405;

  constructor() { }

  ngOnInit() {
  }

}
