import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Requisicion} from '../../interface/requisicion';
import { environment } from 'src/environments/environment';
import { historial } from 'src/app/interface/historial';
import { Usuario } from 'src/app/interface/usuario';
import { detalleReq } from 'src/app/interface/linea';
import { respuesta } from 'src/app/interface/respuesta';

@Injectable({
  providedIn: 'root'
})
export class RequisicionesService {

 public api = environment.urlBaseBD+'/webresources/entidad.encabezadoreq';
 public usuario = environment.urlBaseBD+'/webresources/entidad.encabezadoreq/usuario';
 public estado = environment.urlBaseBD+'/webresources/entidad.encabezadoreq/estado';
 public cotizar = environment.urlBaseBD+'/webresources/entidad.encabezadoreq/cotizar';
 public aprobador = environment.urlBaseBD+'/webresources/entidad.encabezadoreq/aprobar';
 public historial = environment.urlBaseBD+'/webresources/entidad.aprobacion';
 public uskey = environment.urlBaseBD+'/webresources/entidad.cadenaaprobacion/keycloak';
 public linea = environment.urlBaseBD+'/webresources/entidad.detallereq';
 public legalizar = environment.urlBaseBD+'/webresources/entidad.encabezadoreq/legalizar';
 public crearLX =   environment.urlBaseBD+'/webresources/entidad.cadenaaprobacion';
 public crearOCLX =   environment.urlBaseBD+'/webresources/entidad.cadenalegalizacion';

  constructor( 
    private http: HttpClient
  ) { }

  //mostrar todas las requisiciones
  getAllRequisiciones(){
    const path = this.api;
    return this.http.get<Requisicion[]>(path);
  }

  getError(){
    const path =  `${this.api}/estado/Error`;
    return this.http.get<Requisicion[]>(path);
  }

  getAprobadas(){
    const path =  `${this.api}/estadoAprobadaOC/aprobada`;
    return this.http.get<Requisicion[]>(path);
  }

  getReqName(nombre:string){
    const path =  `${this.usuario}/${nombre}`;
    return this.http.get<Requisicion[]>(path);
  }

  //mostrar requisiciones según estado
  getCotizar(){
    const path = this.cotizar;
    return this.http.get<Requisicion[]>(path);
  }

  //mostrar req según id
  getRequisicionId(id:number){
    const path = `${this.api}/${id}`;
    return this.http.get<Requisicion>(path);
  }

  getReqAprobador(usuario:string){
    const path =  this.aprobador;
    let headers = new HttpHeaders();
    headers = headers.append("idAprobador", usuario);
    return this.http.get<Requisicion[]>(path,{headers:headers});
  }
  
  //crear nueva requisición
  createRequisicion(requisicion:Requisicion){
    const path = this.api;
    return this.http.post<Requisicion>(path, requisicion);
  }

  //modificar requisicion
  updateRequisicion(requisicion:Requisicion){
    const path = `${this.api}/${requisicion.idReq}`;
    return this.http.put<Requisicion>(path, requisicion);
  }

  getHistorial(){
    const path = this.historial;
    return this.http.get<historial[]>(path);
  }

  getkeycloak(user:string){
    const path = `${this.uskey}/${user}`;
    return this.http.get<Usuario>(path);
  }

  getLegalizar(user:string){
    const path = `${this.legalizar}/${user}`;
    return this.http.get<Requisicion[]>(path);
  }

  deleteLinea(id:number){
    const path = `${this.linea}/borrar/${id}`;
    return this.http.delete<detalleReq>(path);
  }

  enviarLX(requisicion:Requisicion){
    const path = `${this.crearLX}/aprobar/${requisicion.idReq}`;
    let headers = new HttpHeaders();
    let hed = new HttpHeaders();
    headers = headers.append("usuario", requisicion.idAprobador);
    headers = headers.append("correos", requisicion.correo);
    return this.http.put<respuesta>(path, requisicion, {headers:headers});
  }

  enviarLXOC(requisicion:Requisicion){
    const path = `${this.crearOCLX}/aprobarL/${requisicion.idReq}`;
    let headers = new HttpHeaders();
    let hed = new HttpHeaders();
    headers = headers.append("usuario", requisicion.idAprobador);
    headers = headers.append("correos", requisicion.correo);
    return this.http.put<respuesta>(path, requisicion, {headers:headers});
  }

}
