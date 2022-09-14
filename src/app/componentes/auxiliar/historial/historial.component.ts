import { Component, OnInit } from '@angular/core';
import {RequisicionesService} from '../../../services/requisicion/requisiciones.service'
import { historial } from 'src/app/interface/historial';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  historial:Array<historial>;
  cargando:boolean;
  constructor(
    private requisicionService: RequisicionesService
  ) { }

  ngOnInit(): void {
    this.historial = new Array;
    this.mostrarHistorial();
  }

mostrarHistorial(){
  this.requisicionService.getHistorial().subscribe(todos => {
      this.historial=todos;
  });
}



open(requisicion){
  window.open(window.location.href.substring(0,window.location.href.lastIndexOf('/'))+'/ver/'+requisicion.idReq,  '_blank')
} 

}
