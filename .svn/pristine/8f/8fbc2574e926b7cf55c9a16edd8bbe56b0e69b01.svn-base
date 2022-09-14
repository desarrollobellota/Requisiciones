import { Component, OnInit } from '@angular/core';
import { Requisicion } from 'src/app/interface/requisicion';
import { RequisicionesService } from '../../../services/requisicion/requisiciones.service'

@Component({
  selector: 'app-requisicion',
  templateUrl: './requisicion.component.html',
  styleUrls: ['./requisicion.component.css']
})
export class RequisicionComponent implements OnInit {

  public requisiciones:Array<Requisicion>; 
  public cargando:boolean = false;

  constructor(
    private requisicionService: RequisicionesService
  ) { }

  ngOnInit(): void {
    this.mostrarRequisiciones();
  }

  mostrarRequisiciones(){
    this.cargando=true;
    this.requisicionService.getAllRequisiciones().subscribe(todos => {
      this.cargando=false;
      this.requisiciones=todos;
      
    }, error => {
      console.log(error);
      alert('Hubo un error al mostrar requisiciones'+error.message);
    });
  }

  open(requisicion){
    window.open(window.location.href.substring(0,window.location.href.lastIndexOf('/'))+'/ver/'+requisicion.idReq,  '_blank')
  } 
}
