import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'applications/json'})
};

@Injectable()
export class LugaresService {

  API_ENDPOINT = 'https://platzisquare-8308c.firebaseio.com';

  constructor(
    private afbd: AngularFireDatabase,
    private httpClient: HttpClient
  ) { }

  getLugares() {
    return this.afbd.list('lugares');
    // return this.httpClient.get<any>(this.API_ENDPOINT + '/.json').map((resultado) => {
    //   return resultado.lugares;
    // });
  }

  getLugar(id: number) {
    return this.afbd.database.ref(`lugares/${id}`);
  }

  guardarLugar(lugar) {
    // this.afbd.database.ref(`lugares/${lugar.id}`).set(lugar);
    // https://platzisquare-8308c.firebaseio.com/lugares.json
    return this.httpClient.post(this.API_ENDPOINT + '/lugares.json', lugar, httpOptions);
  }

  actualizarLugar(lugar) {
    this.afbd.database.ref(`lugares/${lugar.id}`).set(lugar);
  }

  obtenerGeoData(direccion) {
    const url_geo = `http://maps.google.com/maps/api/geocode/json?address=${direccion}`;
    return this.httpClient.get<any>(url_geo);
  }

}
