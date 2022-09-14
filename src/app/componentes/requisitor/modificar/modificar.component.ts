import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequisicionesService } from 'src/app/services/requisicion/requisiciones.service';
import { Requisicion } from 'src/app/interface/requisicion';
import { Cadena } from 'src/app/interface/cadena';
import { CadenaService } from 'src/app/services/cadena/cadena.service';
import { KeycloakService } from 'keycloak-angular';
import { Usuario } from 'src/app/interface/usuario';
import { ProveedorD } from 'src/app/interface/proovedorD';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import { Almacen } from 'src/app/interface/almacen';
import { AlmacenService } from 'src/app/services/almacen/almacen.service';
import { detalleReq } from 'src/app/interface/linea';
import { ProductoD } from 'src/app/interface/productoD';
import { ProductoService } from 'src/app/services/productoD/productoD.service';
import { Cc } from 'src/app/interface/cc';
import { CcService } from 'src/app/services/cc/cc.service';
import { exit } from 'process';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {
  public id;
  public requisicion: Requisicion;
  public nomArea: Array<Cadena>;
  public usuario: Usuario;
  public areaSeleccionada: Cadena;
  public nomProv: Array<ProveedorD>;
  public proveedorSeleccionado: ProveedorD;
  public nomAlmc: Array<Almacen>;
  public almacenSeleccionado: Almacen;
  public newLin: boolean;
  public nuevaLinea: detalleReq;
  public productoSeleccionado: ProductoD;
  displayDialog: boolean;
  public linea: detalleReq;
  public fechaCr: Date;
  public nuevaFecha: Date;
  public lineas: Array<detalleReq>;
  public nomProd: Array<ProductoD>;
  public moneda: Array<string>;
  modifico: boolean;
  public activo: boolean = true;
  public cargando: boolean;
  public ccSeleccionado: Cc;
  public ccs: Array<Cc>;
  public cantidadTotal: number;
  public cantidadLineas: number;

  constructor(
    private _route: ActivatedRoute,
    private cadenaService: CadenaService,
    private keykloak: KeycloakService,
    private proveedorService: ProveedorService,
    private almacenService: AlmacenService,
    private productoDService: ProductoService,
    private ccService: CcService,
    private requisicionService: RequisicionesService
  ) {
    this.usuario = new Usuario(this.keykloak);
    this.id = this._route.snapshot.paramMap.get('id');
    this.fechaCr = new Date();
    this.nuevaFecha = new Date();
    this.moneda = ['COP', 'USD', 'EUR'];
  }

  ngOnInit() {
    this.requisicion = new Requisicion;
    this.mostrarRequisiciones(this.id);
    this.nuevaLinea = new detalleReq();
    this.newLin = true;
    this.filtroArea();
    this.cantidadTotal = 0;
    this.cantidadLineas = 0;
  }

  filtroArea() {
    this.cadenaService.getUsuario(this.usuario.username).subscribe((areas) => {
      this.nomArea = areas;
      this.areaSeleccionada = areas[0];
    });
  }
  filtroAlmc(event) {
    let query = event.query;
    this.almacenService.getDinamico(query).subscribe((todos) => {
      this.nomAlmc = todos;
    }, error => {
      console.log(error);
      alert('Hubo un error al mostar almacenes' + error.message);
    })
  }
  filtroProv(event) {
    let query = event.query;
    this.proveedorService.getDinamico(query).subscribe((todos) => {
      this.nomProv = todos;
    }, error => {
      console.log(error);
      alert('Hubo un error al mostar proveedores ' + error.message);
    });
  }

  filtroProd(event) {
    let query = event.query;
    this.productoDService.getDinamico(query).subscribe((todo) => {
      this.nomProd = todo;
    }, error => {
      console.log(error);
      alert('Hubo un error al mostrar productos ' + error.message);
    })
  }

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

  //Guarda el producto creado en el array lineas para mostrarlos en la tabla y añadir a la requisición
  productosCreados(producto: ProductoD, cc: Cc) {
    if (producto != null) {
      this.nuevaLinea.codProducto = producto.codProducto;
      
      if(producto.tipo != null){
        this.nuevaLinea.tipo = producto.tipo;
      }else{
        alert("No se seleccionó el producto, se debe dar click en la lista de items");
      }

      console.log(cc);
      if (cc != null) {
        this.nuevaLinea.idCentroCostos = cc.codigoCentroCosto;
        console.log(this.nuevaLinea.idCentroCostos);
      }
      if (this.nuevaLinea.tipo == 'BienEconomico' && this.nuevaLinea.idCentroCostos == null) {
        alert('Para los NI el centro de costos es un campo obligatorio'); exit();
      }
    }
    if (this.newLin) {
      this.lineas.push(this.nuevaLinea);
      this.activo = false;
      this.cantidadTotal = this.cantidadTotal + (this.nuevaLinea.valorUnidad*this.nuevaLinea.cantidad);
    }
    else {
      this.lineas[this.lineas.indexOf(this.linea)] = this.nuevaLinea;
      this.cantidadTotal=0;
      for (let i = 0; i < this.lineas.length; i++) {
        this.cantidadTotal = this.cantidadTotal + (this.lineas[i].valorUnidad*this.lineas[i].cantidad);
      }
    }
    this.cantidadLineas = this.lineas.length;
    //this.cantidadTotal = this.cantidadTotal + this.nuevaLinea.subtotal;
    this.nuevaLinea = new detalleReq;
    this.displayDialog = false;

  }

  //Borra un producto creado
  borrar() {
    let index = this.lineas.indexOf(this.linea);
    this.requisicionService.deleteLinea(this.lineas[index].idDetalle).subscribe(res => {
      this.ngOnInit();
    })
    this.cantidadTotal = 0;
    for (let i = 0; i < this.lineas.length; i++) {
      this.cantidadTotal = this.cantidadTotal + (this.lineas[i].subtotal);
    }
    if (this.cantidadLineas > 0) {
      this.cantidadLineas--;
    }
    this.nuevaLinea = new detalleReq;
    this.displayDialog = false;
  }

  nuevoProd() {
    this.newLin = true;
    this.linea = new detalleReq;
    this.displayDialog = true;
  }

  modificar(lineas: Array<detalleReq>, almacen: Almacen, proveedor: ProveedorD, area: Cadena) {
    this.cargando = true;
    if (almacen != null) { this.requisicion.idAlmacen = almacen.codigo; }
    if (proveedor != null) { this.requisicion.codProveedor = proveedor.codProveedor }
    if (area != null) { this.requisicion.idArea = area.area }
    if (this.requisicion.legalizacion == true) {
      this.requisicion.estado = "legalizar";
    } else {
      this.requisicion.estado = "pendiente";
    }
    this.requisicion.idModifico = this.usuario.username;
    this.requisicion.fechaModificacion = this.fechaCr;
    this.requisicion.lanzar = false;
    this.requisicion.valorReq = this.cantidadTotal;
    this.requisicionService.updateRequisicion(this.requisicion).subscribe(todos => {
      this.cargando = false;
      this.modifico = true;
      this.ngOnInit();
    }, error => {
      this.cargando = false;
      console.log(error);
      alert('Hubo un error al modificar la requisición ');
    })
    this.ngOnInit();
  }

  mostrarRequisiciones(id) {
    this.requisicionService.getRequisicionId(id).subscribe(todos => {
      this.requisicion = todos;
      this.lineas = todos.detalleReq;
      this.cantidadLineas = this.lineas.length;
      this.cantidadTotal = 0;
      for (let i = 0; i < this.lineas.length; i++) {
        if (this.lineas[i].valorUnidad != null && this.lineas[i].cantidad != null) {
          this.cantidadTotal = this.cantidadTotal + (this.lineas[i].valorUnidad * this.lineas[i].cantidad);
        }
      }
    }, error => {
      console.log(error);
      alert('Hubo un error al mostrar la requisición ' + error.message);
    });
  }

  mostrarCc(event) {
    let query = event.query;
    let area = this.areaSeleccionada.area;
    this.ccService.getDinamico(query, area).subscribe(todos => {
      this.ccs = todos;
    })
  }

}
