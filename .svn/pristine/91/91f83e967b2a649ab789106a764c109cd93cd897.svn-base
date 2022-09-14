import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../../../services/proveedor/proveedor.service';
import { ProveedorD } from 'src/app/interface/proovedorD';
import { Area } from '../../../interface/area';
import { RequisicionesService } from '../../../services/requisicion/requisiciones.service';
import { Requisicion } from '../../../interface/requisicion';
import { detalleReq } from '../../../interface/linea';
import { AlmacenService } from '../../../services/almacen/almacen.service';
import { Almacen } from '../../../interface/almacen';
import { ProductoService } from '../../../services/productoD/productoD.service';
import { ProductoD } from '../../../interface/productoD';
//import {CcService} from '../../../services/cc/cc.service';
import { CadenaService } from '../../../services/cadena/cadena.service';
import { Cadena } from '../../../interface/cadena';
//import {Cc} from '../../../interface/cc';
import { Usuario } from '../../../interface/usuario';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { Cc } from 'src/app/interface/cc';
import { CcService } from 'src/app/services/cc/cc.service';
import { exit } from 'process';
import { Precio } from 'src/app/interface/precios';
import { codProducto } from 'src/app/interface/precio_producto';
import { IfStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'requisitor',
  templateUrl: './requisitor.component.html',
  styleUrls: ['./requisitor.component.css']
})

export class RequisitorComponent implements OnInit {
  displayDialog: boolean; //Modal producto nuevo
  confirmacion: boolean; //Modal confirmación de creación de una requisición 
  faltaAlmacen: boolean;
  ErrorCantidad: boolean;
  public fechaCreacion;
  public fechaCr: Date;
  public usuario: Usuario;
  public valorTotalReq: number;
  public nomProv: Array<ProveedorD>;
  public nomAlmc: Array<Almacen>;
  public nomArea: Array<Cadena>;
  public nomProd: Array<ProductoD>;
  public proveedorSeleccionado: any;
  public almacenSeleccionado: any;
  public areaSeleccionada: Cadena;
  public productoSeleccionado: ProductoD;
  public area: Area;
  public almacen: Almacen;
  public productoD: ProductoD;
  public ccSeleccionado: Cc;
  public ccs: Array<Cc>;
  public lineas: Array<detalleReq>;
  public linea: detalleReq;
  public newLin: boolean;
  public nuevaLinea: detalleReq;
  public moneda: Array<string>;
  public requisicion: Requisicion;
  public requisiciones: Array<Requisicion>;
  public cadena: Cadena;
  public cargando: boolean = false;
  public activo: boolean = true;
  public id: number;
  public cantidadLineas: number;
  public cantidadTotal: number;
  public precios: Precio;
  public productosR: Array<string>;
  public cantidades: Array<number>;
  public posibles_precios: Precio;
  public datos: Array<codProducto>;

  constructor(
    private proveedorService: ProveedorService,
    private requisicionService: RequisicionesService,
    private almacenService: AlmacenService,
    private productoDService: ProductoService,
    private cadenaService: CadenaService,
    private ccService: CcService,
    protected router: Router,
    private keykloak: KeycloakService
  ) {
    this.proveedorSeleccionado = new ProveedorD;
    this.moneda = ['COP', 'USD', 'EUR'];
    this.usuario = new Usuario(this.keykloak);
    this.fechaCr = new Date();
    this.fechaCreacion = this.fechaCr.getDate() + '-' + (this.fechaCr.getMonth() + 1) + '-' + this.fechaCr.getFullYear();
  }

  ngOnInit() {
    this.cantidadLineas = 0;
    this.cantidadTotal = 0;
    this.lineas = [];
    this.newLin = true;
    this.requisicion = new Requisicion();
    this.linea = new detalleReq();
    this.nuevaLinea = new detalleReq();
    this.filtroArea();
    this.requisicion.moneda = "COP";

  }

  // ******* Funciones que consumen los W.S de LX  ******* //

  filtroProv(event) {
    let query = event.query;
    this.proveedorService.getDinamico(query).subscribe((todos) => {
      this.nomProv = todos;
    }, error => {
      console.log(error);
      alert('No hay conexión, error al mostrar proveedores');
    });
  }

  filtroAlmc(event) {
    let query = event.query;
    this.almacenService.getDinamico(query).subscribe((todos) => {
      this.nomAlmc = todos;
    }, error => {
      console.log(error);
      alert('No hay conexión, error al mostrar almacenes');
    })
  }

  filtroArea() {
    this.cadenaService.getUsuario(this.usuario.username).subscribe((areas) => {
      this.nomArea = areas;
      this.areaSeleccionada = areas[0];
    }, error => {
      console.log(error);
      alert('No hay conexión, error al mostrar área');
    });
  }

  filtroProd(event) {
    let query = event.query;
    this.productoDService.getDinamico(query).subscribe((todo) => {
      this.nomProd = todo;
    }, error => {
      console.log(error);
      alert('No hay conexión, error al mostrar productos');
    })
  }

  mostrarCc(event) {
    let query = event.query;
    let area = this.areaSeleccionada.area;
    this.ccService.getDinamico(query, area).subscribe(todos => {
      this.ccs = todos;
    })
  }

  // *******                                         ******* // 

  //Envia las variables capturadas en el formulario para crear la requisición
  crearRequisicion(productos: Array<detalleReq>, proveedor, almc, area) {
    if (this.almacenSeleccionado.codigo == null) {
      this.faltaAlmacen = true;
    } else {
      this.cargando = true;
      this.requisicion.legalizacion = false;
      this.requisicion.idRequisitor = this.usuario.username;
      this.requisicion.nombreRequisitor = this.usuario.firstName;
      this.requisicion.fechaCreacion = this.fechaCr;
      this.requisicion.estado = 'pendiente';
      this.requisicion.codProveedor = proveedor.codProveedor;
      this.requisicion.idAlmacen = almc.codigo;
      this.requisicion.idArea = area.area;
      this.requisicion.detalleReq = productos;
      this.requisicion.puntoEnvio = almc.codigo;
      this.requisicion.correo = this.usuario.email;
      this.requisicion.lanzar = false;
      this.requisicion.valorReq = this.valorTotal(productos);
      this.requisicion.secuenciaAprobacion = area.numeroSecuencia;
      this.requisicionService.createRequisicion(this.requisicion).subscribe((nuevo) => {
        this.id = nuevo.idReq;
        this.confirmacion = true;
        this.cargando = false;
        this.ngOnInit();
      }, error => {
        this.cargando = false;
        console.log(error);
        alert('Hubo un error al crear la requisición');
        this.ngOnInit();
      });
      this.ngOnInit();
    }

  }

  //Calculo del valor total de la requisición 
  valorTotal(producto: Array<detalleReq>) {
    let total = 0;
    for (let i = 0; i < producto.length; i++) {
      total = total + (producto[i].valorUnidad * producto[i].cantidad);
    }
    return total;
  }

  //Guarda el producto creado en el array lineas para mostrarlos en la tabla y añadir a la requisición
  productosCreados(producto: ProductoD, cc: Cc) {
    if (producto.codProducto == null) {
      alert("No se selecciono un producto");
      this.displayDialog = true;
    } else {
      //validar que la cantidad NO sea 0
      if (this.nuevaLinea.cantidad == 0) {
        this.displayDialog = false;
        this.ErrorCantidad = true;
      }
      else {
        //insertar CC si es que se selecciono en el encabezado y NO al añadir el producto
        if (cc != null) {
          this.nuevaLinea.idCentroCostos = cc.codigoCentroCosto;
          this.ccSeleccionado = cc;
        }
        this.nuevaLinea.codProducto = producto.codProducto;
        this.nuevaLinea.tipo = producto.tipo;
        this.nuevaLinea.subtotal = this.nuevaLinea.cantidad * this.nuevaLinea.valorUnidad;
        if (this.nuevaLinea.tipo == 'BienEconomico' && this.nuevaLinea.idCentroCostos == null) {
          alert('Para los NI el centro de costos es un campo obligatorio'); exit();
        }

        if (this.newLin) {
          this.lineas.push(this.nuevaLinea);
          this.activo = false;
          this.cantidadTotal = this.cantidadTotal + this.nuevaLinea.subtotal;
        } else {
          this.lineas[this.lineas.indexOf(this.linea)] = this.nuevaLinea;
          this.cantidadTotal=0;
          for (let i = 0; i < this.lineas.length; i++) {
            this.cantidadTotal = this.cantidadTotal + (this.lineas[i].valorUnidad*this.lineas[i].cantidad);
          }
        }
        this.cantidadLineas = this.lineas.length;
        this.nuevaLinea = new detalleReq;
        this.displayDialog = false;
      }
    }
  }
  //Borra un producto creado
  delete() {
    let index = this.lineas.indexOf(this.linea);
    this.lineas = this.lineas.filter((val, i) => i != index);

    this.cantidadTotal = 0;
    for (let i = 0; i < this.lineas.length; i++) {
      this.cantidadTotal = this.cantidadTotal + (this.lineas[i].subtotal);
    }
    if(this.cantidadLineas>0){
      this.cantidadLineas--;
    }

    this.nuevaLinea = new detalleReq;
    this.displayDialog = false;
  }

  //Permite seleccionar un producto en la tabla para modificarlo
  onRowSelect(event) {
    this.newLin = false;
    this.nuevaLinea = this.clonePro(event.data);
    this.productoSeleccionado = new ProductoD();
    this.productoSeleccionado.codProducto = this.nuevaLinea.codProducto;
    this.productoSeleccionado.tipo = this.nuevaLinea.tipo;
    this.displayDialog = true;
  }

  clonePro(p: detalleReq): detalleReq {
    let producto = new detalleReq;
    for (let prop in p) {
      producto[prop] = p[prop];
    }
    return producto;
  }

  nuevoProd() {
    this.newLin = true;
    this.linea = new detalleReq;
    this.displayDialog = true;
  }

  creadaReq() {
    this.confirmacion = false;
    this.router.navigate(['/registro']);
  }

  //consulta los precios de los productos EN lx
  precio(prod: ProductoD, linea: detalleReq) {
    if(this.proveedorSeleccionado.codProveedor != null){
      this.precios = new Precio;
      this.precios.codProveedor = this.proveedorSeleccionado.codProveedor;
      linea.codProducto=prod.codProducto;
      this.datos = new Array;
      this.datos[0] = new codProducto;
      this.datos[0].codProducto = linea.codProducto;
      this.datos[0].cantidad = linea.cantidad;
      this.precios.codProd = this.datos;
      this.productoDService.precios(this.precios).subscribe(precios => {
        this.posibles_precios = precios;
        this.nuevaLinea.valorUnidad=this.posibles_precios.codProd[0].valorUnidad;
      });
    }else{
      this.nuevaLinea.valorUnidad=0;
    }
  }

}



