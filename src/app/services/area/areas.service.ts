import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Area} from '../../interface/area';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  public ws = environment.urlBaseLX+'/webresources/area';
  constructor(
    private http: HttpClient
  ) { }

  //mostrar todas las áreas

  getDinamico(event){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", environment.headerWSLX);
    const path = `${this.ws}/listar/${event}/0/10/`;
    return this.http.get<Area[]>(path,{headers:headers});
  } 


  getIdAreas(id:string){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", environment.headerWSLX);
    const path = `${this.ws}/coincidencia/${id}`;
    return this.http.get<Area>(path,{headers:headers});
  }
}
