import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Usuario } from '../../interface/usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    public usuario: Usuario
  ) {}

  ngOnInit(): void {
  }

}
