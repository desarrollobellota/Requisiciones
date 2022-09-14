import { Component, OnInit } from '@angular/core';
import { OcService } from 'src/app/services/oc/oc.service';
import { adminProvee } from 'src/app/interface/adminProve';
import { ProveedorD } from 'src/app/interface/proovedorD';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';

@Component({
  selector: 'app-admin-prov',
  templateUrl: './admin-prov.component.html',
  styleUrls: ['./admin-prov.component.css']
})
export class AdminProvComponent implements OnInit {
  public todos:Array<ProveedorD>;
  public proveedor:adminProvee;
  public proveedores:Array<adminProvee>;
  public provSelect:adminProvee;
  public nomProv: Array<ProveedorD>; 
  public respuesta: string;
  crearprov:boolean;
  cargando:boolean;
  updateCorreo:boolean;
  crearProve:boolean;
 // activo:boolean = true;                   
  proveedorSeleccionado:ProveedorD;
  constructor(
    private ocService: OcService,
    private proveedorService: ProveedorService,
    ) 
    { }

  ngOnInit(): void {
    this.proveedor = new adminProvee;
    this.todos = new Array;
    this.cargando = true;
    this.provSelect = new adminProvee;
    this.mostrarProv();
  }
  
  mostrarProv(){
    this.ocService.getProv().subscribe(provee => {
      this.cargando=false;
      this.proveedores = provee;
    })
  }

  ProveeSelect(oc:adminProvee){
    this.provSelect=oc;
    this.updateCorreo=true
  }

  modificarProv(Prov:adminProvee){
    this.ocService.modificarProv(Prov).subscribe(res=>{
      this.ngOnInit();
    })
  }

  eliminarProv(Prov:adminProvee){
    this.ocService.eliminarProv(Prov.codProveedor).subscribe(res=>{
      this.ngOnInit();
    })
  }

  crearProv(proveedor:ProveedorD, newProv:adminProvee){ 
    this.cargando=true;
    newProv.codProveedor = proveedor.codProveedor;
    newProv.nombreProveedor = proveedor.nombreProveedor;
    this.ocService.crearProv(newProv).subscribe(prov => {
      this.cargando=false;
      this.crearprov=true;
      this.respuesta = prov.titulo + prov.detalle;
    })
  }

  insetarprov(){
    this.cargando=true;
      this.proveedorService.insertarProv().subscribe(res => {
        this.cargando=false;
        this.ngOnInit();
      }, error=>{
        this.cargando=false;
        console.log(error);
      });
    }


  mostrarProveedores(event){
    let query = event.query;
    this.proveedorService.getDinamico(query).subscribe(todos => {
      this.nomProv=todos;
    });
  }
}
