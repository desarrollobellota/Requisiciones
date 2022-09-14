import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ocXaprobar } from 'src/app/interface/ocXaprobar';
import { Requisicion } from 'src/app/interface/requisicion';
import { respuesta } from 'src/app/interface/respuesta';
import { oc } from 'src/app/interface/oc';
import { ocLinea } from 'src/app/interface/ocLinea';
import { OCCorreo } from 'src/app/interface/OCCorreo';
import { adminProvee } from 'src/app/interface/adminProve';
import { ProveedorD } from 'src/app/interface/proovedorD';
@Injectable({
  providedIn: 'root'
})
export class OcService {
  public ordenes = environment.urlBaseBD+'/webresources/entidad.ordencompra';
  public apiBD = environment.urlBaseBD+'/webresources/entidad.encabezadoreq';
  public ordenLX = environment.urlBaseLX+'/webresources/historialoc';
  public proveedor = environment.urlBaseBD+'/webresources/entidad.proveedor';

  constructor(
    private http: HttpClient
  ) { }

  getOCxAprobar(aprobador:string){
    const path = `${this.ordenes}/aprobar/${aprobador}`;
    return this.http.get<ocXaprobar[]>(path);
  }

  getExcepciones(){
    const path = `${this.ordenes}/excepcion`;
    return this.http.get<ocXaprobar[]>(path);
  }

  getOCxId(numero:number){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", environment.headerWSLX);
    const path = `${this.ordenLX}/itemsoc/${numero}`;
    return this.http.get<ocLinea[]>(path,{headers:headers});
  }

  getReq(idLX:number){
    const path = `${this.apiBD}/idLX/${idLX}`;
    return this.http.get<Requisicion[]>(path);
  }

  getProv(){
    const path = `${this.proveedor}/mostrarTodo`;
    return this.http.get<adminProvee[]>(path);
  }

  asignarCadena(area:String, OC:number){
    const path = `${this.ordenes}/asignar/${area}/${OC}`;
    return this.http.get<respuesta>(path);
  }

  actualizarOCxAprobar(){
    const path = `${this.ordenes}/ocAprobar`;
    return this.http.get<respuesta>(path);
  }

  aprobarOC(numeroOC:number, usuario:string, valor:number, correo:string){
    console.log(numeroOC);
    console.log(usuario);
    console.log(valor);
    console.log(correo);
    const path = `${this.ordenes}/aprobarOC/${numeroOC}/${usuario}/${valor}/${correo}`;
    return this.http.get<respuesta>(path);
  }

  rechazarOC(numeroOC:number, usuario:string, correo:string, observacion: string){
    const path = `${this.ordenes}/rechazarOC/${numeroOC}/${usuario}/${correo}/${observacion}`;
    return this.http.get<respuesta>(path);
  }

  pendientesCorreo(){
    const path = `${this.ordenes}/pendientesOC`;
    return this.http.get<OCCorreo[]>(path);
  }

  enviarCorreo(Ordenes:Array<OCCorreo> , Correouser:string, contrasena:string){
    const path = `${this.ordenes}/enviarCorreo/${Correouser}/${contrasena}`;
    return this.http.post<respuesta>(path,Ordenes);
  }

  marcarEnviados(Orden:number){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", environment.headerWSLX);
    const path = `${this.ordenLX}/enviadoProv/${Orden}`;
    return this.http.post<respuesta>(path,null,{headers:headers});
  }

  eliminarProv(IdProv:number){
    const path = `${this.proveedor}/${IdProv}`;
    return this.http.delete<adminProvee>(path);
  }

  modificarProv(Prov:adminProvee){
    const path = `${this.proveedor}/${Prov.codProveedor}`;
    return this.http.put<adminProvee>(path, Prov);
  }

  crearProv(proveedor:adminProvee){
    const path = `${this.proveedor}/crear`;
    return this.http.post<respuesta>(path,proveedor);

  }

  getHistorial(){
    const path = this.ordenes;
    return this.http.get<ocXaprobar[]>(path);
  }

  getObservacionxOC(numero:number){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", environment.headerWSLX);
    const path = `${this.ordenLX}/observacionesoc/${numero}`;
    return this.http.get<string>(path,{headers:headers, responseType : 'text' as 'json'});
  }

  getObservacionUsuarioxOC(numero:number){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", environment.headerWSLX);
    const path = `${this.ordenLX}/observacionusuariooc/${numero}`;
    return this.http.get<string>(path,{headers:headers, responseType : 'text' as 'json'});
  }
}
