import { Component, OnInit } from '@angular/core';
import { OCCorreo } from 'src/app/interface/OCCorreo';
import { OcService } from 'src/app/services/oc/oc.service';
import { KeycloakService } from 'keycloak-angular';
import { Usuario } from 'src/app/interface/usuario';

@Component({
  selector: 'app-enviar-oc',
  templateUrl: './enviar-oc.component.html',
  styleUrls: ['./enviar-oc.component.css']
})
export class EnviarOCComponent implements OnInit {
  public ordenes: Array<OCCorreo>;
  public ordenesSelect: Array<OCCorreo>;
  public ocSelect: OCCorreo;
  public usuario: Usuario;
  public contrasena:string;
  public res:string;
  pedirContra:boolean;
  cargando:boolean;
  respuesta:boolean;
  noEnvio:boolean;
  constructor(
    private ocService: OcService,
    private keykloak: KeycloakService
  ) { 
    
  }

  ngOnInit(): void {
    this.cargando=true;
    this.usuario = new Usuario(this.keykloak);
    this.mostrarOC();
    this.ocSelect = new OCCorreo;
  }

  mostrarOC(){
    this.ocService.pendientesCorreo().subscribe(ordenes=>{
      this.ordenes = ordenes;
      this.cargando=false;
    })
  }

  pedirContrasena(oc:Array<OCCorreo>){
    this.pedirContra=true;
  }

  enviarCorreo(oc:Array<OCCorreo>){
    this.cargando=true;
    localStorage.setItem("contrasena", this.contrasena);
    this.ocService.enviarCorreo(oc, this.usuario.email, localStorage.getItem("contrasena")).subscribe(res =>{
      this.cargando=false;
      this.res = res.titulo + res.detalle;
      this.respuesta=true;
      localStorage.clear();
      this.marcarEnviados(oc);
    }, error=>{
      this.res = error;
    })
  }

  noEnviar(oc:OCCorreo){
    this.ocSelect = oc;
    console.log(oc);
    this.noEnvio=true;
  }
  
  wsOCEnviada(oc:OCCorreo){
    this.cargando=true;
    this.ocService.marcarEnviados(oc.numeroOrdenCompra).subscribe(res => {
      this.cargando=false;
      this.ngOnInit();
    }, error=>{
      this.cargando=false;
      this.res = error.message;
    })
  }

  marcarEnviados(oc:Array<OCCorreo>){
    this.cargando=true;
    for(let i=0; i<oc.length; i++){
      this.wsOCEnviada(oc[i]);
  }
}

  verOC(oc:OCCorreo){
    window.open(window.location.href.substring(0,window.location.href.lastIndexOf('/'))+'/verOC/'+oc.numeroOrdenCompra,  '_blank')
  }

}
