import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { respuesta } from 'src/app/interface/respuesta';
import { orden } from 'src/app/interface/orden';


@Injectable({
  providedIn: 'root'
})
export class RecepcionService {

  public ws =   environment.urlBaseLX+'/webresources/recepcionoc';

  constructor( 
    private http: HttpClient
  ) { }

  getPendientes(){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization",  environment.headerWSLX);
    const path =  `${this.ws}/ordenespendientes`;
    return this.http.get<orden[]>(path,{headers:headers});
  }

  enviarLX(orden:Array<orden>){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization",  environment.headerWSLX);
    const path = `${this.ws}/guardar`;
    return this.http.post<respuesta>(path,orden,{headers:headers});
  }
}
