import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OcService } from '../../../services/oc/oc.service';
import { oc } from '../../../interface/oc';
import { DataService } from 'src/app/services/data.service';
import { AlmacenService} from '../../../services/almacen/almacen.service';
import { ProductoService} from '../../../services/productoD/productoD.service';
import { ProveedorService} from '../../../services/proveedor/proveedor.service';
import { Almacen} from '../../../interface/almacen';
import { ProductoD} from '../../../interface/productoD';
import { ProveedorD} from '../../../interface/proovedorD';
import { vista_linea } from 'src/app/interface/vista_linea';
import { ocLinea } from 'src/app/interface/ocLinea';

@Component({
  selector: 'app-ver-oc',
  templateUrl: './ver-oc.component.html',
  styleUrls: ['./ver-oc.component.css']
})
export class VerOCComponent implements OnInit {

  public menu:boolean;
  public orden:Array<ocLinea>;
  public id; 
  public total:number;
  public fecha:string;
  public comentario:string;
  public observaciones:string;

  constructor(
    private ordenService: OcService,
    private _route: ActivatedRoute,
    private dataService: DataService
  ) {
    this.id = this._route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.dataService.mostrar$.emit(false);
    this.orden=new Array;
    this.total=0;
    this.mostrarOC(this.id);
  }

 mostrarOC(id){
    this.ordenService.getObservacionxOC(id).subscribe(comen => {
      this.comentario = comen;
    }, error => {
      console.log(error);
      alert('Hubo un error al mostrar la observacion de la orden '+error.message);
    });
    this.ordenService.getObservacionUsuarioxOC(id).subscribe(obser => {
      this.observaciones = obser;
    }, error => {
      console.log(error);
      alert('Hubo un error al mostrar la observacion de la orden '+error.message);
    });
    this.ordenService.getOCxId(id).subscribe(todos => {
      this.orden=todos;
      for(let i=0; i<this.orden.length; i++){
        let ano =  this.orden[i].fechaVencimiento.toString().substring(0,4);
        let mes =  this.orden[i].fechaVencimiento.toString().substring(4,6);
        let dia =  this.orden[i].fechaVencimiento.toString().substring(6,8);
        this.fecha = ano+'-'+mes+'-'+dia;
        this.total = this.total + this.orden[i].valorUnitario * this.orden[i].cantidadOC;
      }
      console.log(this.orden);
    }, error => {
      console.log(error);
      alert('Hubo un error al mostrar la orden '+error.message);
    });
  }

  

}
