import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Cc} from '../../interface/cc';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CcService {

  public api = environment.urlBaseLX+ '/webresources/centrocosto';

  constructor(
    private http: HttpClient
  ) { }

  //mostrar todas los cc
  getDinamico(event,area){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", environment.headerWSLX);
    const path = `${this.api}/listar/${area}/${event}/0/10/`;
    return this.http.get<Cc[]>(path,{headers:headers});
  }

  /*getDinamico(event){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", environment.headerWSLX);
    const path = `${this.api}/listar/${event}/0/10/`;
    return this.http.get<Cc[]>(path,{headers:headers});
  }*/

}
