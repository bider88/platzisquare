import { Component, OnInit } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css'],
  animations: [
    trigger('contenedorAnimable', [
      state('inicial', style({
        opacity: 0
      })),
      state('final', style({
        opacity: 1
      })),
      transition ('inicial => final', animate(2000)),
      transition ('final => inicial', animate(1000))
    ])
  ]
})
export class LugaresComponent implements OnInit {

  title: String = 'PlatiSquare';
  state = 'inicial';

  lat = null;
  lng = null;
  lugares= null;
  zoom = 5;

  // animar() {
  //   this.state = (this.state === 'final' ? 'inicial' : 'final');
  // }

  // animacionInicial(e) {
  //   console.log(`Iniciado: ${e}`);
  // }

  // animacionTerminada(e) {
  //   console.log(`Terminado: ${e}`);
  // }

  constructor(
    lugaresService: LugaresService
  ) {
    lugaresService.getLugares().valueChanges().subscribe(lugares => {
      this.lugares = lugares;
      this.state = 'final';
    });

    // lugaresService.getLugares()
    //   .subscribe(lugares => {
    //     this.lugares = lugares;
    //     // const me = this;
    //     // me.lugares = Object.keys(me.lugares).map(function (key) { return me.lugares[key]; });

    //     this.lugares = Object.keys(this.lugares).map((key) => this.lugares[key] );
    //     this.state = 'final';
    //   }, error => {
    //     alert(`Error ${error.status}. Message ${error.statusText}`);
    //   }, () => {
    //     console.log('Se completó correctamente');
    //   });

    this.setCurrentPosition();
  }

  ngOnInit() {
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
