import { Component, OnInit } from '@angular/core';
import { RequisicionesService } from '../../../services/requisicion/requisiciones.service';
import { Requisicion } from '../../../interface/requisicion';
import { Usuario } from 'src/app/interface/usuario';
import { ocXaprobar } from 'src/app/interface/ocXaprobar';
import { KeycloakService } from 'keycloak-angular';
import { CadenaService } from '../../../services/cadena/cadena.service';
import { OcService } from '../../../services/oc/oc.service';
import { Cadena } from '../../../interface/cadena';
import { oc } from '../../../interface/oc';
import { OrdenCompraComponent } from '../../auxiliar/orden-compra/orden-compra.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'aprobador',
  templateUrl: './aprobador.component.html',
  styleUrls: ['./aprobador.component.css']
})
export class AprobadorComponent implements OnInit {
  desactivar: boolean;
  Modal_rechazada: boolean = false;
  Modal_aprobada: boolean = false;
  confirmarRechazo: boolean = false;
  confirmarAprob: boolean = false;
  confirmarRechazoOC: boolean = false;
  confirmarAprobOC: boolean = false;
  Modal_rechazada_oc: boolean = false;
  Modal_aprobada_oc: boolean = false;
  error: boolean = false;
  public correos: string;
  public usuario: Usuario;
  public ordenesCompra: Array<ocXaprobar>;
  public NumReqs: Array<number>;
  public requisicion: Requisicion;
  public requisiciones: Array<Requisicion>;
  public reqSelect: Requisicion;
  public aprobador: String; //aqui guardo el sgt aprobador
  public fechaMd: Date;
  public cadena: Cadena;
  public cad_Areas: Array<Cadena>;
  public secuencia: Array<number>;
  public sgt_aprobador: String;
  public estado: String;
  public mayor: number;
  public requisicionSeleccionada: Requisicion;
  public cargando: boolean = false;
  public Error;
  public ocSelect: oc;
  public ordenSeleccionada: ocXaprobar;

  constructor(
    private requisicionService: RequisicionesService,
    private cadenaService: CadenaService,
    private ocService: OcService,
    private keykloak: KeycloakService
  ) {

  }

  ngOnInit(): void {
    this.usuario = new Usuario(this.keykloak);
    this.fechaMd = new Date();
    this.requisicionSeleccionada = new Requisicion;
    this.ordenSeleccionada = new ocXaprobar;
    this.mostrarRequisiciones();
    this.consultarOC();
    this.desactivar = false;
  }

  mostrarRequisiciones() {
    this.cargando = true;
    this.requisicionService.getReqAprobador(this.usuario.username).subscribe(todos => {
      this.requisiciones = todos;

      let i = 1;
      for (let i = 0; i < this.requisiciones.length; i++) {
        if (this.requisiciones[i].legalizacion == true) {
          this.requisiciones[i].tipo = 'Legalizacion';
        } else {
          this.requisiciones[i].tipo = 'Requisicion';
        }
      }

      this.cargando = false;
    }, error => {
      this.cargando = false;
      console.log(error);
      alert('Hubo un error al mostrar requisiciones por lanzar ' + error.message);
    });
  }

  consultarOC() {
    this.cargando = true;
    this.ocService.getOCxAprobar(this.usuario.username).subscribe(todos => {
      this.ordenesCompra = todos;
      this.cargando = false;
      for (let i = 0; i < todos.length; i++) {
        this.NumReqs.push(this.ordenesCompra[i].numeroRequisicion);
      }
    }, error => {
      this.cargando = false;
      console.log(error);
      alert('Hubo un error al mostrar las ordenes de compra ' + error.message);
    });
  }

  confirmarRech(req: Requisicion) {
    this.requisicionSeleccionada = req;
    this.confirmarRechazo = true;

  }
  confirmarAproba(req: Requisicion) {
    this.requisicionSeleccionada = req;
    this.confirmarAprob = true;
  }

  rechazar_req() {
    this.cargando = true;
    this.correos = this.usuario.email;
    this.confirmarRechazo = false;
    this.cadenaService.rechazarRequ(this.requisicionSeleccionada.idReq, this.usuario.username, this.correos, this.requisicionSeleccionada.comentario_comprador).subscribe((respuesta) => {
      this.cargando = false;
      this.Modal_rechazada = true;
      this.ngOnInit();
    }, error => {
      this.ngOnInit();
      this.Error = error.message;
      this.error = true;
    });
  }

  aprobar_req() {
    this.cargando = true;
    this.correos = this.usuario.email;
    this.cadenaService.aprobarRequ(this.requisicionSeleccionada.idReq, this.usuario.username, this.correos, this.requisicionSeleccionada.tipo).subscribe((respuesta) => {
      this.aprobador = respuesta.titulo + respuesta.detalle;
      this.Modal_aprobada = true;
      this.confirmarAprob = false;
      this.cargando = false;
      this.ngOnInit();
    }, error => {
      this.cargando = false;
      this.ngOnInit();
      console.log(error);
      this.Error = error.message;
      this.error = true;
    });
  }

  open(requisicion) {
    window.open(window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/ver/' + requisicion.idReq, '_blank')
  }

  verOC(oc: ocXaprobar) {
    window.open(window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/verOC/' + oc.numeroOrdenCompra, '_blank')
  }

  verReq(oc: ocXaprobar) {
    console.log(oc);
    this.ocService.getReq(oc.numeroRequisicion).subscribe(req => {
      this.requisicion = req[0];
      console.log(this.requisicion);
      console.log(this.requisicion.idReq);
      window.open(window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/ver/' + this.requisicion.idReq, '_blank')
    })

  }

  confirmarRechOC(oc: ocXaprobar) {
    this.ordenSeleccionada = oc;
    this.confirmarRechazoOC = true;

  }
  confirmarAprobaOC(oc: ocXaprobar) {
    this.ordenSeleccionada = oc;
    this.confirmarAprobOC = true;
  }

  rechazar_oc() {
    this.cargando = true;
    this.correos = this.usuario.email;
    this.confirmarRechazoOC = false;
    this.ocService.rechazarOC(this.ordenSeleccionada.numeroOrdenCompra, this.usuario.username,
      this.correos, this.ordenSeleccionada.observacion).subscribe((respuesta) => {
        this.cargando = false;
        this.confirmarRechazoOC = false;
        this.Modal_rechazada_oc = true;
        this.ngOnInit();
      }, error => {
        this.ngOnInit();
        this.Error = error.message;
        this.error = true;
      });
  }

  aprobar_oc() {
    this.cargando = true;
    this.correos = this.usuario.email;
    this.ocService.aprobarOC(this.ordenSeleccionada.numeroOrdenCompra, this.usuario.username, this.ordenSeleccionada.nuevoValor, this.correos).subscribe((respuesta) => {
      this.aprobador = respuesta.titulo + respuesta.detalle;
      this.confirmarAprobOC = false;
      this.Modal_aprobada = true;
      this.cargando = false;
      this.ngOnInit();
    }, error => {
      this.cargando = false;
      this.ngOnInit();
      console.log(error);
      this.Error = error.message;
      this.error = true;
    });
  }

}
