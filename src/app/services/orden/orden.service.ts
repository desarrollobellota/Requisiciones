import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {orden} from '../../interface/orden';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  public api = environment.urlBaseLX+ '/webresources/recepcionoc';

  constructor(
    private http: HttpClient
  ) { }

  //metodo que retorna las ordenes pendientes del producto necesario
  getDinamico(prod,cant,tipo){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", environment.headerWSLX);
    const path = `${this.api}/coincidencia/${prod}/${cant}/${tipo}`;
    return this.http.get<orden[]>(path,{headers:headers});
  }

  //metodo que retorna las ordenes pendientes del producto necesario
  getDinamicoOC(orden){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", environment.headerWSLX);
    const path = `${this.api}/coincidenciaoc/${orden}`;
    return this.http.get<orden[]>(path,{headers:headers});
  }
}