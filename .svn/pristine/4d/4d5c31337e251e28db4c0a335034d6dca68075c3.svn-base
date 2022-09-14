import { Component, OnInit } from '@angular/core';
import {OcService} from '../../../services/oc/oc.service';
import {ocXaprobar} from 'src/app/interface/ocXaprobar';

@Component({
  selector: 'app-historialoc',
  templateUrl: './historialoc.component.html',
  styleUrls: ['./historialoc.component.css']
})
export class HistorialocComponent implements OnInit {

  oc:Array<ocXaprobar>;
  cargando:boolean;
  constructor(
    private OcService: OcService
  ) { }

  ngOnInit(): void {
    this.oc = new Array;
    this.mostrarHistorial();
  }

  mostrarHistorial(){
    this.OcService.getHistorial().subscribe(todos => {
        this.oc=todos;
    });
  }
  
  
  
  open(oc){
    window.open(window.location.href.substring(0,window.location.href.lastIndexOf('/'))+'/verOC/'+oc.numeroOrdenCompra,  '_blank')
  } 

}
