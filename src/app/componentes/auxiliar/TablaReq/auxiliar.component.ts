import { Component, OnInit } from '@angular/core';
import { RequisicionesService } from '../../../services/requisicion/requisiciones.service';
import { Requisicion } from '../../../interface/requisicion';
import { detalleReq } from '../../../interface/linea'
import { ProveedorService } from '../../../services/proveedor/proveedor.service'
import { ProveedorD } from 'src/app/interface/proovedorD';
import { Usuario } from 'src/app/interface/usuario';
import { KeycloakService } from 'keycloak-angular';
import { Precio } from 'src/app/interface/precios';
import { codProducto } from 'src/app/interface/precio_producto';
import { ProductoService } from '../../../services/productoD/productoD.service';
import { CadenaService } from '../../../services/cadena/cadena.service';

@Component({
  selector: 'auxiliar',
  templateUrl: './auxiliar.component.html',
  styleUrls: ['./auxiliar.component.css']
})


export class AuxiliarComponent implements OnInit {
  display: boolean = false;
  lanzar: boolean = false;
  rechazo: boolean = false;
  modalFalse: boolean = false;
  exito: boolean = false;
  error: boolean = false;
  desactivar: boolean;
  public correos: string;
  public requisicion: Requisicion;
  public requisiciones: Array<Requisicion>; //mostrar por estado
  public nomProv: Array<ProveedorD>;
  public proveedorSeleccionado: ProveedorD;
  public reqId: Requisicion; //mostrar lineas de req
  public reqSelect: Requisicion;
  public productos: Array<detalleReq>;
  public fechaModificacion;
  public fechaMd: Date;
  public usuario: Usuario;
  public precios: Precio;
  public datos: Array<codProducto>;
  public proveedor: number;
  public productosR: Array<string>;
  public cantidades: Array<number>;
  public posibles_precios: Precio;
  public moneda: Array<string>;

  public cargando: boolean;
  public respuesta: string;

  constructor(
    private requisicionService: RequisicionesService,
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
    private cadenaService: CadenaService,
    private keykloak: KeycloakService
  ) {

    this.reqId = new Requisicion;
    this.usuario = new Usuario(this.keykloak);
    this.fechaMd = new Date();
    this.fechaModificacion = this.fechaMd.getDate() + '-' + (this.fechaMd.getMonth() + 1) + '-' + this.fechaMd.getFullYear();
    this.proveedorSeleccionado = new ProveedorD;
  }

  ngOnInit(): void {
    this.mostrarRequisiciones();
    this.ReqLanzar = new Requisicion;
    this.desactivar = false;
  }

  showDialog(reqSelect) {
    this.requisicionService.getRequisicionId(reqSelect.idReq).subscribe(todos => {
      this.reqId = todos;
      this.display = true;
    },
      error => {
        console.log(error);
        alert('Hubo un error al mostrar requisiciones por id');
      })

  }
  public bandera: boolean = false;
  public ReqLanzar: Requisicion;
  //confirmar que la requisición si tenga cantidad y precios para los productos
  confirmacionLanzar(requisicion: Requisicion) {
    for (let i = 0; i < requisicion.detalleReq.length; i++) {
      if (requisicion.detalleReq[i].valorUnidad == null || requisicion.detalleReq[i].valorUnidad == 0 || requisicion.detalleReq[i].cantidad == null || requisicion.detalleReq[i].cantidad == 0) {
        this.modalFalse = true;
        break;
      }
    } if (this.modalFalse == false) {
      this.ReqLanzar = requisicion;
      this.lanzar = true;
    }

  }

  //función que consulta si la requisición se puede o no lanzar a aprobación
  LanzarReq(requisicion: Requisicion) {
    this.cargando = true;
    this.fechaModificacion = this.fechaMd;
    this.correos = this.usuario.email;
    this.cadenaService.lanzarReq(requisicion.idReq, this.usuario.username, this.correos).subscribe(todo => {
      this.respuesta = todo.titulo + todo.detalle;
      this.cargando = false;
      this.exito = true;
      this.lanzar = false;
      this.ngOnInit();
    }, error => {
      this.respuesta = error.message;
      this.cargando = false;
      this.lanzar = false;
      this.error = true;
      this.ngOnInit();
    });
  }

  mostrarRequisiciones() {
    this.cargando = true;
    this.requisicionService.getCotizar().subscribe(todos => {
      this.requisiciones = todos;
      for (let i = 0; i < this.requisiciones.length; i++) {
        if (this.requisiciones[i].fechaModificacion != null) {
          this.requisiciones[i].fechaModificacion.toString().substring(0, 10);
        }
      } this.cargando = false;
    }, error => {
      this.cargando = false;
      console.log(error);
      alert('Hubo un error al mostrar requisiciones por estado ' + error.message);
    });
  }

  mostrarProveedores(event) {
    let query = event.query;
    this.proveedorService.getDinamico(query).subscribe(todos => {
      this.nomProv = todos;
    });
  }

  //guardar los cambios hechos por el auxiliar de compras y la fecha y usuario que modifico la req
  modificarProducto(idProd: Requisicion, proveedor: ProveedorD) {
    if (this.reqId.codProveedor == null) { this.reqId.codProveedor = proveedor.codProveedor; }
    /** 
    for(let i=0; i<idProd.detalleReq.length; i++){
      if(idProd.detalleReq[i].fechaCompras != null){
        idProd.detalleReq[i].fechaCompras = new Date(idProd.detalleReq[i].fechaCompras);
        console.log( idProd.detalleReq[i].fechaCompras);
      }
    }*/

    this.reqId.fechaModificacion = this.fechaMd;
    this.reqId.idModifico = this.usuario.firstName;
    this.reqId.valorReq = this.valorTotal(this.reqId.detalleReq);
    this.requisicionService.updateRequisicion(idProd).subscribe(todo => {
      this.ngOnInit();
    }, error => {
      console.log(error);
      alert('Hubo un error al modificar requisición ' + error.message);
    });
    this.ngOnInit();
    this.display = false;
  }

  //calcula el valor total de la requisicion
  valorTotal(producto: Array<detalleReq>) {
    let total = 0;
    for (let i = 0; i < producto.length; i++) {
      total = total + (producto[i].valorUnidad * producto[i].cantidad);
    }
    return total;
  }

  open(requisicion) {
    window.open(window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/ver/' + requisicion.idReq, '_blank')
  }

  //consulta los precios de los productos EN lx
  precio(req: Requisicion, proveedor) {
    this.precios = new Precio;
    this.productosR = new Array;
    this.cantidades = new Array;
    this.datos = new Array;
    this.posibles_precios = new Precio;

    if (req.codProveedor == null) {
      req.codProveedor = proveedor;
      this.proveedor = proveedor;
    } else { this.proveedor = req.codProveedor; }
    for (let i = 0; i < req.detalleReq.length; i++) {
      this.productosR.push(req.detalleReq[i].codProducto);
      this.cantidades.push(req.detalleReq[i].cantidad);
    }
    for (let i = 0; i < req.detalleReq.length; i++) {
      this.datos[i] = new codProducto;
      this.datos[i].codProducto = this.productosR[i];
      this.datos[i].cantidad = this.cantidades[i];
    }

    this.precios.codProveedor = this.proveedor;
    this.precios.codProd = this.datos;
    console.log(this.precios, 'este le envio al ws');
    this.productoService.precios(this.precios).subscribe(precios => {
      this.posibles_precios = precios;
      console.log(precios);
      this.asignarPrecio(req);
    });

  }
  //guarda los precio en el campo valor unidad del detalle de la requisición
  asignarPrecio(req) {
    for (let i = 0; i < req.detalleReq.length; i++) {
      this.reqId.detalleReq[i].valorUnidad = this.posibles_precios.codProd[i].valorUnidad;
    }
  }

  motivoRechazo(req: Requisicion) {
    this.rechazo = true;
    this.ReqLanzar = req;
  }

  //rechazar requisición
  rechazarReq(req: Requisicion) {
    this.cargando=true;
    this.rechazo = false;
    this.cadenaService.rechazarRequ(req.idReq, this.usuario.username, this.usuario.email, req.comentario_comprador).subscribe(res => {
      this.cargando = false;
      this.respuesta = res.titulo + res.detalle;
      this.exito = true;
      this.ngOnInit();
    }, error => {
      this.cargando = false;
      alert('Hubo un error al rechazar la requisición ' + error.message);
    }
    )
  }

}







