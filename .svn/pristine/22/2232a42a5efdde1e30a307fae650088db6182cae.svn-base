import { Component, OnInit } from '@angular/core';
import { Requisicion } from 'src/app/interface/requisicion';
import { RequisicionesService } from 'src/app/services/requisicion/requisiciones.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

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
    this.requisicionService.getError().subscribe(todos => {
      console.log(todos);
      this.cargando=false;
      this.requisiciones=todos;
      
    }, error => {
      console.log(error);
      alert('Hubo un error al mostrar requisiciones '+error.message);
    });
  }

  enviarLX(requisicion:Requisicion){
    this.cargando=true;
    if(requisicion.legalizacion == false){
      this.requisicionService.enviarLX(requisicion).subscribe(res => {
        this.cargando=false;
        alert('Requisición creada con éxito, el número en LX es: '+ res.detalle);
        this.ngOnInit();
      }, error => {
        this.cargando=false;
        alert('Error al crear la req en LX '+ error.message);
      });
    }else{
      this.requisicionService.enviarLXOC(requisicion).subscribe(res => {
        this.cargando=false;
        alert('Requisición creada con éxito, el número en LX es: '+ res.detalle);
        this.ngOnInit();
      }, error => {
        this.cargando=false;
        alert('Error al crear la req en LX '+ error.message);
      });
    }
  }

  open(requisicion){
    window.open(window.location.href.substring(0,window.location.href.lastIndexOf('/'))+'/ver/'+requisicion.idReq,  '_blank')
  }

}
