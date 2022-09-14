import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Ubicacion} from '../../interface/ubicacion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  public ws = environment.urlBaseLX+'/webresources/ubicacion'

  constructor(   
    private http: HttpClient
  ) { }
  
   //mostrar todas las ubicaciones de la bodega
  getDinamico(event){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", environment.headerWSLX);
    const path = `${this.ws}/listar/${event}/0/10`;
    return this.http.get<Ubicacion[]>(path,{headers:headers});
  }

  //mostrar ubicacion según id
  getIdUbicacion(id:string,bod:string){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization",  environment.headerWSLX);
    const path = `${this.ws}/coincidencia/${id}/${bod}`;
    return this.http.get<Ubicacion[]>(path,{headers:headers});
  }
}