import { Component, OnInit } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  id: any= null;
  lugar: any = {};
  success: Boolean = true;
  message: string = '';
  warning: Boolean = true;
  messageW: string = '';
  results$: Observable<any>;
  private searchField: FormControl;

  constructor(
    private lugaresService: LugaresService,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    this.id = this.route.snapshot.params['id'];
    if (this.id !== 'new') {
      this.lugaresService.getLugar(this.id).once('value').then((result) => {
        this.lugar = result.val();
      });
    }
    // else {
    //   this.lugar.nombre = 'Lugar de prueba';
    //   this.lugar.distancia = 5.2;
    //   this.lugar.cercania = 2;
    //   this.lugar.plan = 'pagado';
    //   this.lugar.descripcion = 'Descripción X';
    //   this.lugar.calle = 'calle 74 poniente';
    //   this.lugar.ciudad = 'Puebla';
    //   this.lugar.pais = 'México';
    // }

    const URL = 'https://maps.google.com/maps/api/geocode/json';
    this.searchField = new FormControl();
    this.results$ = this.searchField.valueChanges
      .debounceTime(300)
      .switchMap(query => this.httpClient.get<any>(`${URL}?address=${query}`))
      .map(response => response.results);
  }

  ngOnInit() {
  }

  selAddress(result) {
    // console.log(result);
    if (result) {
      this.lugar.calle = `${result.address_components[1].long_name} ${result.address_components[0].long_name}`;
      this.lugar.ciudad = result.address_components[5].long_name;
      this.lugar.pais = result.address_components[6].long_name;
    }
  }

  guardarLugar() {
    const direccion = this.lugar.calle + ',' + this.lugar.ciudad + ',' + this.lugar.pais;
    this.lugaresService.obtenerGeoData(direccion).subscribe(res =>{
      // debugger;
      this.lugar.lat = res.results[0].geometry.location.lat;
      this.lugar.lng = res.results[0].geometry.location.lng;
      if(this.id !== 'new'){
        this.lugaresService.actualizarLugar(this.lugar);
        this.message = 'Se ha actualizado con éxito';
        this.success = false;
      } else {
        this.lugar.id = Date.now();
        this.lugaresService.guardarLugar(this.lugar).subscribe();
        this.message = 'Se ha guardado con éxito';
        this.success = false;
      }
      this.lugar = {};
    });
  }
}
