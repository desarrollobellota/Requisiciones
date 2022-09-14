import { Component, OnInit } from '@angular/core';
import { RequisicionesService} from '../../../services/requisicion/requisiciones.service';
import { Requisicion} from '../../../interface/requisicion';
import { Usuario } from 'src/app/interface/usuario';
import { KeycloakService } from 'keycloak-angular';
import { Aprobacion } from 'src/app/interface/aprobacion';
import { CadenaService} from '../../../services/cadena/cadena.service';
import { Cadena} from '../../../interface/cadena';

@Component({
  selector: 'app-aprob-lega',
  templateUrl: './aprob-lega.component.html',
  styleUrls: ['./aprob-lega.component.css']
})
export class AprobLegaComponent implements OnInit {
  desactivar: boolean;
  Modal_rechazada: boolean = false;
  Modal_aprobada: boolean = false;
  confirmarRechazo: boolean = false;
  confirmarAprob: boolean = false;
  error: boolean = false;
  public correos:string;
  public usuario: Usuario;
  public requisicion: Requisicion;
  public requisiciones:Array<Requisicion>;
  public reqSelect: Requisicion;
  public aprobador:String; //aqui guardo el sgt aprobador
  public fechaMd: Date;
  public registro: Aprobacion;
  public cadena: Cadena;
  public cad_Areas: Array<Cadena>;
  public secuencia: Array<number>;
  public sgt_aprobador:String;
  public estado:String;
  public mayor:number;
  public requisicionSeleccionada:Requisicion;
  public cargando:boolean=false;
  public Error;

  constructor(
    private requisicionService: RequisicionesService,
    private cadenaService: CadenaService,
    private keykloak: KeycloakService
  ) { }

  ngOnInit(): void {
    this.usuario = new Usuario(this.keykloak);
    this.fechaMd = new Date();
    this.requisicionSeleccionada = new Requisicion;
    this.mostrarRequisiciones();
    this.desactivar=false;
  }

  mostrarRequisiciones(){
    this.cargando=true;
    this.requisicionService.getLegalizar(this.usuario.username).subscribe(todos => {
      this.requisiciones=todos;
      this.cargando=false;
      console.log(todos);
    }, error => {
      this.cargando=false;
      console.log(error);
      alert('Hubo un error al mostrar requisiciones por lanzar '+error.message);
    });
  }

 confirmarRech(req:Requisicion){
  this.requisicionSeleccionada = req;
  this.confirmarRechazo=true;
  
 }
 confirmarAproba(req:Requisicion){
  this.requisicionSeleccionada = req; 
  this.confirmarAprob = true;
 }

 rechazar_req() { 
   this.cargando=true;
  this.correos = this.usuario.email;
  this.confirmarRechazo = false;
  this.cadenaService.rechazarLega(this.requisicionSeleccionada.idReq, this.usuario.username, this.correos).subscribe((respuesta) =>{
    this.cargando=false;
    this.Modal_rechazada = true;
    this.ngOnInit();
  }, error => {
    this.Error=error.message;
    this.error=true;
    this.ngOnInit();
  });
}

 aprobar_req() {
  this.cargando=true;
  this.correos = this.usuario.email;
  this.cadenaService.aprobarLega(this.requisicionSeleccionada.idReq, this.usuario.username, this.correos).subscribe((respuesta) =>{
    this.aprobador=respuesta.titulo + respuesta.detalle;
    this.Modal_aprobada = true;
    this.confirmarAprob = false;
    this.cargando=false;
    this.ngOnInit();
  }, error => {
    this.cargando=false;
    console.log(error);
    this.Error=error.message;
    this.error=true;
    this.ngOnInit();
  });
}

open(requisicion){
  window.open(window.location.href.substring(0,window.location.href.lastIndexOf('/'))+'/ver/'+requisicion.idReq,  '_blank')
}

}
