import { Component, OnInit } from '@angular/core';
import { OcService } from '../../../services/oc/oc.service';
import { oc } from '../../../interface/oc';
import { Usuario } from 'src/app/interface/usuario';
import { KeycloakService } from 'keycloak-angular';
import { Requisicion } from 'src/app/interface/requisicion';
import { ocXaprobar } from 'src/app/interface/ocXaprobar';
@Component({
  selector: 'app-aprob-ordenes',
  templateUrl: './aprob-ordenes.component.html',
  styleUrls: ['./aprob-ordenes.component.css']
})
export class AprobOrdenesComponent implements OnInit {

  desactivar: boolean;
  Modal_rechazada: boolean = false;
  Modal_aprobada: boolean = false;
  confirmarRechazo: boolean = false;
  confirmarAprob: boolean = false;
  error: boolean = false;
  public correos:string;
  public usuario: Usuario;
  public ordenesCompra:Array<ocXaprobar>;
  public OCUsusario:Array<ocXaprobar>;
  public NumReqs:Array<number>;
  public ocSelect: oc;
  public aprobador:String; 
  public fechaMd: Date;
  public ordenSeleccionada:ocXaprobar;
  public requisicion:Requisicion;
  public cargando:boolean=false;
  public Error:string;

  constructor(
    private ocService: OcService,
    private keykloak: KeycloakService
  ) { }

  ngOnInit(): void {
    this.usuario = new Usuario(this.keykloak);
    this.fechaMd = new Date();
    this.ordenSeleccionada = new ocXaprobar;
    this.consultarOC();
    this.NumReqs = new Array;
    this.desactivar=false;
  }

  consultarOC(){
    this.cargando=true;
    this.ocService.getOCxAprobar(this.usuario.username).subscribe(todos => {
    this.ordenesCompra=todos;
    this.cargando=false;
      for(let i=0; i< todos.length; i++){
        this.NumReqs.push(this.ordenesCompra[i].numeroRequisicion);
      }
    }, error => {
      this.cargando=false;
      console.log(error);
      alert('Hubo un error al mostrar las ordenes de compra '+error.message);
    });
  }


 confirmarRech(oc:ocXaprobar){
  this.ordenSeleccionada = oc;
  this.confirmarRechazo=true;
  
 }
 confirmarAproba(oc:ocXaprobar){
  this.ordenSeleccionada = oc; 
  this.confirmarAprob = true;
 }

 rechazar_oc() { 
   this.cargando=true;
  this.correos = this.usuario.email;
  this.confirmarRechazo = false;
  this.ocService.rechazarOC(this.ordenSeleccionada.numeroOrdenCompra, this.usuario.username, 
                            this.correos, this.ordenSeleccionada.observacion).subscribe((respuesta) =>{
    this.cargando=false;
    this.Modal_rechazada = true;
    this.ngOnInit();
  }, error => {
    this.ngOnInit();
    this.Error=error.message;
    this.error=true;
  });
}

 aprobar_oc() {
  this.cargando=true;
  this.correos = this.usuario.email;
  this.ocService.aprobarOC(this.ordenSeleccionada.numeroOrdenCompra, this.usuario.username, this.ordenSeleccionada.nuevoValor, this.correos).subscribe((respuesta) =>{
    this.aprobador=respuesta.titulo + respuesta.detalle;
    this.Modal_aprobada = true;
    this.confirmarAprob = false;
    this.cargando=false;
    this.ngOnInit();
  }, error => {
    this.cargando=false;
    this.ngOnInit();
    console.log(error);
    this.Error=error.message;
    this.error=true;
  });
}

verOC(oc:ocXaprobar){
  window.open(window.location.href.substring(0,window.location.href.lastIndexOf('/'))+'/verOC/'+oc.numeroOrdenCompra,  '_blank')
}

verReq(oc:ocXaprobar){
  console.log(oc);
  this.ocService.getReq(oc.numeroRequisicion).subscribe(req => {
    this.requisicion = req[0];
    console.log(this.requisicion);
    console.log(this.requisicion.idReq);
    window.open(window.location.href.substring(0,window.location.href.lastIndexOf('/'))+'/ver/'+this.requisicion.idReq,  '_blank')
  })
  
}

}
