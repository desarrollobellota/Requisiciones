import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequisicionesService } from '../../../../services/requisicion/requisiciones.service';
import { Requisicion } from '../../../../interface/requisicion';
import { DataService } from 'src/app/services/data.service';
import { AlmacenService} from '../../../../services/almacen/almacen.service';
import { ProductoService} from '../../../../services/productoD/productoD.service';
import { ProveedorService} from '../../../../services/proveedor/proveedor.service';
import { Almacen} from '../../../../interface/almacen';
import { ProductoD} from '../../../../interface/productoD';
import { ProveedorD} from '../../../../interface/proovedorD';
import { vista_linea } from 'src/app/interface/vista_linea';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit {

  public menu:boolean;
  public requisicion:Requisicion;
  public id; 
  public almacen:Almacen;
  public proveedor:ProveedorD;
  public productos:Array<ProductoD>;
  public vista_req:Array<vista_linea>;
  public fecha:string;

  constructor(
    private requisicionService: RequisicionesService,
    private _route: ActivatedRoute,
    private dataService: DataService,
    private almacenService: AlmacenService,
    private proveedorService: ProveedorService,
    private productoService: ProductoService
  ) {

    this.id = this._route.snapshot.paramMap.get('id');
    this.productos = new Array;
    this.proveedor = new ProveedorD;
    this.almacen = new Almacen;
    this.vista_req = new Array;
   }

  ngOnInit(){
    this.dataService.mostrar$.emit(false);
    this.mostrarRequisiciones(this.id);
  }

  mostrarRequisiciones(id){
    this.requisicionService.getRequisicionId(id).subscribe(todos => {
      this.requisicion=todos;
      this.vistaRequisicion(this.requisicion);
    }, error => {
      console.log(error);
      alert('Hubo un error al mostrar la requisición '+error.message);
    });
  }

  vistaRequisicion(requisicion:Requisicion){
    this.fecha = requisicion.fechaCreacion.toString().substring(0, 10);
      this.proveedorService.getProvId(requisicion.codProveedor).subscribe(proveed => {
        this.proveedor = proveed;
        console.log(proveed)
      });
      this.almacenService.getAlmacen(requisicion.idAlmacen).subscribe(almacenR => {
        this.almacen = almacenR;
      });
      
      this.vista_req = new Array(this.requisicion.detalleReq.length);
      for(let i=0; i<this.requisicion.detalleReq.length; i++){
        this.vista_req[i]=new vista_linea();
        this.vista_req[i].codProduct = new ProductoD;
        this.vista_req[i].cantidad=requisicion.detalleReq[i].cantidad;
        this.vista_req[i].centroCostos=requisicion.detalleReq[i].idCentroCostos;
        this.vista_req[i].id=requisicion.detalleReq[i].idDetalle;
        this.vista_req[i].idRequisicion=requisicion.detalleReq[i].idRequisicion;
        this.vista_req[i].observacion=requisicion.detalleReq[i].observacion;
        this.vista_req[i].tipo=requisicion.detalleReq[i].tipo;
        this.vista_req[i].valorUnidad=requisicion.detalleReq[i].valorUnidad;
        if( requisicion.detalleReq[i].fechaRequerido != null){
          this.vista_req[i].fechaRequerida=requisicion.detalleReq[i].fechaRequerido.toString().substring(0, 10);
        }
        if( requisicion.detalleReq[i].fechaCompras != null){
          this.vista_req[i].fechaCompras=requisicion.detalleReq[i].fechaCompras.toString().substring(0, 10);
        }
        this.productoService.getIdProd(requisicion.detalleReq[i].codProducto).subscribe(produR => {
          this.vista_req[i].codProduct = produR;        
        }); 
      
        console.log( this.vista_req[i].centroCostos);
      
      } 
      
  }


}
