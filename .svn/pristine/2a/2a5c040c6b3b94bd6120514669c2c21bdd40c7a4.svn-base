import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Almacen} from '../../interface/almacen';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  public ws = environment.urlBaseLX+'/webresources/almacen'

  constructor(   
    private http: HttpClient
  ) { }
  
   //mostrar todas los almacénes
  getDinamico(event){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", environment.headerWSLX);
    const path = `${this.ws}/listar/${event}/0/10/`;
    return this.http.get<Almacen[]>(path,{headers:headers});
  }

  //mostrar almacén según id
  getIdAlmacen(id:string){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization",  environment.headerWSLX);
    const path = `${this.ws}/coincidencia/${id}`;
    return this.http.get<Almacen>(path,{headers:headers});
  }

  //mostrar almacén según id
  getAlmacen(id:string){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization",  environment.headerWSLX);
    const path = `${this.ws}/encontrar/${id}`;
    return this.http.get<Almacen>(path,{headers:headers});
  }
}

