import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { SMLV } from 'src/app/interface/smlg';
import { comprador } from 'src/app/interface/comprador';
import { Cadena } from 'src/app/interface/cadena';
import { Usuario } from 'src/app/interface/usuario';
import { CadenaService } from 'src/app/services/cadena/cadena.service';

@Component({
  selector: 'app-cadenaLegali',
  templateUrl: './cadena-legali.component.html',
  styleUrls: ['./cadena-legali.component.css']
})
export class CadenaLegaliComponent implements OnInit {

  inactivo:boolean;
  activo:boolean;
  confirmarI:boolean;
  confirmarA:boolean;
  confComI:boolean;
  estado:boolean;
  newCadena:boolean;
  newComprador:boolean;
  cadenacreada:boolean;
  compradorCreado:boolean;
  public cadenas;
  public cadena:Cadena;
  public newCad:boolean;
  public nuevaCadena: Cadena;
  public displayDialog:boolean;
  public sm:SMLV;
  public nuevoSMLV:number;
  public usuario:Usuario;
  public nombre;
  public idCad:Cadena;
  public updateSMLV:boolean;
  public newSMLV:SMLV;
  public exito:boolean;
  public compradores:Array<comprador>;
  public comprador:comprador;

  constructor(
    private cadenaService: CadenaService,
    private keykloak: KeycloakService
  ) {  
    this.sm = new SMLV;
    this.newSMLV = new SMLV();
   }

  ngOnInit(): void {
    this.cadenas = this.mostrarCadena();
    this.usuario = new Usuario(this.keykloak);
    this.MostrarSmlv();
    this.idCad = new Cadena;
    this.comprador = new comprador;
    this.mostrarCompras();
    this.cadena = new Cadena;
  }

mostrarCadena(){
  this.cadenaService.cadenasLegalizaciones().subscribe(todos => {
    this.cadenas=todos;
  }, error => {
    console.log(error);
    alert('Hubo un error al mostrar las cadenas de aprobación'+error.message);
  });
}

mostrarCompras(){
  this.cadenaService.getCompradores().subscribe(compras => {
    this.compradores=compras;
  })
}

MostrarSmlv(){
  let i=0;
  this.cadenaService.smlg().subscribe((sml)=>{
    i = sml.length;
    console.log(sml);
    this.sm = sml[i-1];
  })
}

confirmarCadena(idCadena:Cadena, estado:boolean){
  this.idCad = idCadena;
  this.estado=estado;
  //console.log(estado);
 // console.log(this.estado);
}

confirmaCompras(idCompras:comprador){
  this.confComI=true;
  this.comprador=idCompras;
}

estadoCadena(){
  console.log(this.estado);
  this.cadenaService.estadoCadena(this.idCad.id, this.estado).subscribe((cadenas) => {
    if(cadenas){
      this.inactivo=true;
      this.ngOnInit();}
  });
}

estadoCompras(){
  this.confComI=false;
  this.cadenaService.borrarComprador(this.comprador.id).subscribe(compras => {
    this.ngOnInit();
  })
}

modificarSMLV(SMLV:SMLV){
  this.updateSMLV=false;
  this.cadenaService.updateSmlv(SMLV).subscribe((smlv) => {
    this.newSMLV = smlv;
    this.exito = true;
  })
  this.ngOnInit();
} 

modificarCadena(cadena:Cadena){
  this.cadenaService.updateCadena(cadena).subscribe(res=>{
    this.ngOnInit();
  })
}

anadirCadena(cadena:Cadena){
  this.newCadena=false;
  cadena.estado=true;
  this.cadenaService.nuevaCadena(cadena).subscribe(cadena=>{
    this.cadenacreada=true;
    this.ngOnInit();
  }, error=>{ alert('Revise los campos e intente de nuevo'+error.message);
})
}

anadirComprador(comprador:comprador){
  this.newComprador=false;
  comprador.estado=true;
  this.cadenaService.nuevoComprador(comprador).subscribe(com=>{
    this.compradorCreado=true;
    this.ngOnInit();
  }, error=>{ alert('Revise los campos e intente de nuevo'+error.message);
});
}

}
