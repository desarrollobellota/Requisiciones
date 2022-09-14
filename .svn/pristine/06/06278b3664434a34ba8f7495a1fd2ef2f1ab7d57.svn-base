import { Component, OnInit } from '@angular/core';
import {RequisicionesService} from '../../../services/requisicion/requisiciones.service';
import {Requisicion} from '../../../interface/requisicion';
import {detalleReq} from '../../../interface/linea';
import {ProveedorService} from '../../../services/proveedor/proveedor.service';
import { ProveedorD } from '../../../interface/proovedorD';
import {AlmacenService} from '../../../services/almacen/almacen.service';
import {ProductoService} from '../../../services/productoD/productoD.service';
import {ProductoD} from '../../../interface/productoD';
import {CadenaService} from '../../../services/cadena/cadena.service';
import {Cadena} from '../../../interface/cadena';
//import {CcService} from '../../../services/cc/cc.service';
//import {Cc} from '../../../interface/cc';
import { KeycloakService } from 'keycloak-angular';
import { Usuario } from 'src/app/interface/usuario';
import { DataService } from '../../../services/data.service';
import { Almacen } from 'src/app/interface/almacen';


@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  public modifico: boolean;
  public dialogoConfirm: boolean; //Modal de confirmación para modificación de requisición
  public prodSeleccionado: detalleReq;
  public reqSeleccionada: Requisicion;
  public moneda: Array<string>;
  public requisicion: Requisicion;
  public requisiciones:Array<Requisicion>; 
  public reqSelect: Requisicion;
  public fechaModificacion;
  public fechaMd: Date;
  public fecha:string;
  public nomProd:Array<ProductoD>;
  public productoSeleccionado:any;
  public productoD: ProductoD;
  public productosD;
  public proveedor: ProveedorD;
  public proveedorSeleccionado:ProveedorD;
  public alamcenSeleccionado:Almacen;
  public areas:Array<String>;
  public nomArea:Array<Cadena>;
  public nomProv: Array<ProveedorD>; //alamcena todos los proveedores
  public cargando:boolean=true;
  //public cc: Cc;
  //public ccs;
  public almacenes;
  public usuario: Usuario;
 
  constructor(
    private requisicionService: RequisicionesService,
    private proveedorService: ProveedorService,
    private almacenService: AlmacenService,
    private productoDService: ProductoService,
    private cadenaService: CadenaService,
    protected dataService: DataService,
    //private ccService: CcService,
    private keycloak: KeycloakService
    ) { 
      this.usuario = new Usuario(this.keycloak);
      //this.ccs = this.mostrarCc();
      this.fechaMd = new Date();
      this.fechaModificacion = this.fechaMd.getDate()+'-'+ (this.fechaMd.getMonth() + 1) + '-' + this.fechaMd.getFullYear();
      
    } 

  ngOnInit(): void {
    this.mostrarRequisiciones(this.usuario.username);
    this.reqSelect = new Requisicion;
    this.productoD = new ProductoD;
  }

  filtroProd(event){
    let query = event.query;
    this.productoDService.getDinamico(query).subscribe((todo) => {
      this.nomProd = todo;
    }, error => {
      console.log(error);
      alert('No hay conexión, error al mostrar productos');
    })
  }

  mostrarProveedores(event){
    let query = event.query;
    this.proveedorService.getDinamico(query).subscribe(todos => {
      this.nomProv=todos;
    }, error => {
      console.log(error);
      alert('No hay conexión, error al mostrar proveedores');
    });
  }

  mostrarAlmacenes(event){
    let query = event.query;
    this.almacenService.getDinamico(query).subscribe(todos => {
      this.almacenes=todos; 
    }, error => {
      console.log(error);
      alert('No hay conexión, error al mostrar almacenes');
    })
  }

  public as:Set<String>;
  public buscarA:Array<any> = [];
    filtroArea(event){
      let query = event.query;
      this.areas=new Array;
      this.cadenaService.getUsuario(this.usuario.username).subscribe((areas)=>{
        this.nomArea = areas;
        for(let i=0; i<this.nomArea.length; i++){
          this.areas[i]=this.nomArea[i].area }
        this.areas.forEach(element => {this.as = new Set(this.areas); });
        this.areas= new Array;
        this.areas=Array.from(this.as);
        this.buscarA = this.buscarArea(query, this.areas);
        });
      }
      buscarArea(query,areas:Array<any>):Array<any>{
        let areasB : any[] = [];
        for(let i = 0; i < areas.length; i++) {
            let ar = areas[i];
            if (ar.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              areasB.push(ar);
            }
        }
        return areasB;
      }

  mostrarRequisiciones(nombre){
    this.requisicionService.getReqName(nombre).subscribe(todos => {
      this.cargando=false;
      this.requisiciones=todos;
      
    }, error => {
      console.log(error);
      alert('No hay conexión, error al mostrar requisiciones');
    });
  }


 /**  mostrarCc(){
    this.ccService.getAllCc().subscribe(todos => {
      this.ccs=todos;
    })
  }*/

  modificar(requisicion:Requisicion, almacen:Almacen, proveedor:ProveedorD){
    this.dialogoConfirm=false;
    if(almacen != null){this.reqSelect.idAlmacen = almacen.codigo;}
    if(proveedor != null){this.reqSelect.codProveedor = proveedor.codProveedor} 
    this.reqSelect.estado = "pendiente";
    this.reqSelect.idModifico = this.usuario.username;
    this.reqSelect.fechaModificacion = this.fechaMd;

    this.requisicionService.updateRequisicion(requisicion).subscribe(todos => {
      this.modifico = true;
    }, error => {
      console.log(error);
      alert('Hubo un error al modificar la requisición '+error.message);
    })
    this.ngOnInit();
  }

    //modificar req, poder cambiar cualquier campo del formulario original
    updateList(req:Requisicion) {
     //this.dialogoConfirm=true;
     //this.reqSelect = req;
     window.open(window.location.href.substring(0,window.location.href.lastIndexOf('/'))+'/modificar/'+req.idReq,  '_blank')
    }

      //eliminar req, cambiar estado a eliminada
    remove(idReq) {
      idReq.estado='eliminada';
      this.requisicionService.updateRequisicion(idReq).subscribe(todo => {
       console.log(todo);  
      }, error => {
        console.log(error);
        alert('Hubo un error al modificar la requsición a estado eliminada'+error.message);
      });

    }

    open(requisicion){
      window.open(window.location.href.substring(0,window.location.href.lastIndexOf('/'))+'/ver/'+requisicion.idReq,  '_blank')
    } 


}

