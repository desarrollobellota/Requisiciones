import { Component, OnInit } from '@angular/core';
import { ocXaprobar } from 'src/app/interface/ocXaprobar';
import { OcService } from 'src/app/services/oc/oc.service';
import { KeycloakService } from 'keycloak-angular';
import { Usuario } from 'src/app/interface/usuario';
import { CadenaService } from 'src/app/services/cadena/cadena.service';
import { Cadena } from 'src/app/interface/cadena';

 
@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent implements OnInit {

  ordenes:Array<ocXaprobar>;
  aprobadores:Array<String>;
  areas:Array<String>;
  nomArea:Array<Cadena>;
  cadSelect:String;
  ordenSelect:ocXaprobar;
  cargando:boolean;
  asignarCad:boolean;
  respuesta:String;
  exito:boolean;
  public usuario: Usuario;

  constructor(
    private ocService: OcService,
    private cadenaService: CadenaService,
    private keykloak: KeycloakService
  ) { 
    this.usuario = new Usuario(this.keykloak);
  }

  ngOnInit() {
    this.cargando=true;
    this.mostrarExcepciones();
    this.ordenes = new Array;
    this.ordenSelect = new ocXaprobar;
  
  }

mostrarExcepciones(){
  this.ocService.getExcepciones().subscribe(todos => {
    this.ordenes = todos;
    this.cargando=false;
  });
}

public as:Set<String>;
public buscarA:Array<any> = [];
filtroAprobador(event){
  let query = event.query;
    this.aprobadores=new Array;
    this.cadenaService.getAllCadenas().subscribe((cadenas)=>{
      this.nomArea = cadenas;
      for(let i=0; i<this.nomArea.length; i++){
        this.aprobadores[i]=this.nomArea[i].area }
      this.aprobadores.forEach(element => {this.as = new Set(this.aprobadores); });
      this.aprobadores= new Array;
      this.aprobadores=Array.from(this.as);
      this.buscarA = this.buscarAprob(query, this.aprobadores);
      console.log(this.buscarA); 
      });
    }
    buscarAprob(query,areas:Array<any>):Array<any>{
      let areasB : any[] = [];
      for(let i = 0; i < areas.length; i++) {
          let ar = areas[i];
          if (ar.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            areasB.push(ar);
          }
      }
      return areasB;
    }

  mostrarCad(orden:ocXaprobar){
    this.ordenSelect=orden;
    this.asignarCad=true;
}

asignarCadena(area:String){
  this.ocService.asignarCadena(area, this.ordenSelect.numeroOrdenCompra).subscribe(res=>{
    this.respuesta = res.titulo + res.detalle;
    this.exito=true;
    this.ngOnInit();
  })
}

actualizarTabla(){
  this.cargando=true;
  this.ocService.actualizarOCxAprobar().subscribe(res =>{
    this.respuesta = res.titulo + res.detalle;
    this.cargando=false;
    this.exito=true;
    this.ngOnInit();
  }, error => {
    console.log(error);
    this.cargando=false;
    alert('Hubo un error al mostrar actualizar '+error.message);
    
  } )
}

open(orden){
  window.open(window.location.href.substring(0,window.location.href.lastIndexOf('/'))+'/verOC/'+orden.numeroOrdenCompra,  '_blank')
} 

}