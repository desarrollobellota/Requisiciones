import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProveedorD} from '../../interface/proovedorD';
import { environment } from 'src/environments/environment';
import { adminProvee } from 'src/app/interface/adminProve';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
 public api = environment.urlBaseLX+ '/webresources/proveedor';
 public prov = environment.urlBaseBD+'/webresources/entidad.proveedor';
 public insertar = environment.urlBaseBD+'/webresources/entidad.ordencompra';
  constructor(

    private http: HttpClient
  ) { 

  }

  getDinamico(event){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", environment.headerWSLX);
    const path = `${this.api}/listar/${event}/0/10/`;
    return this.http.get<ProveedorD[]>(path,{headers:headers});
  }

  getProvId(id:number){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", environment.headerWSLX);
    const path = `${this.api}/coincidencia/${id}`;
    return this.http.get<ProveedorD>(path,{headers:headers});
    
  }

  getAll(){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", environment.headerWSLX);
    const path = this.api;
    return this.http.get<ProveedorD[]>(path,{headers:headers})
  }

  insertarProv(){
    const path = `${this.insertar}/insertar/`;
    return this.http.get<ProveedorD>(path);
  }

  
}
