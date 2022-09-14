import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductoD} from '../../interface/productoD'
import { Precio } from 'src/app/interface/precios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public ws = environment.urlBaseLX+'/webresources/producto'

  constructor(
    private http: HttpClient
  ) { }
  getDinamico(event){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization",  environment.headerWSLX);
    const path = `${this.ws}/listar/${event}/0/10/`;
    return this.http.get<ProductoD[]>(path,{headers:headers});
  } 
  getIdProd(id:string){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization",  environment.headerWSLX);
    const path = `${this.ws}/encontrar/${id}`;
    return this.http.get<ProductoD>(path,{headers:headers});
  } 

  precios(productos:Precio){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization",  environment.headerWSLX);
    const path = `${this.ws}/precio/`;
    return this.http.post<Precio>(path,productos,{headers:headers});
  }

}
