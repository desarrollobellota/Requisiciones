import { KeycloakService } from 'keycloak-angular';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class Usuario {

    public username:string;
    public firstName:string;
    public email:string;
    public roles:Array<any>;
    public area:Array<any>;
  
   
    constructor(protected keycloakAngular: KeycloakService) {
        //console.log(keycloakAngular.getKeycloakInstance().tokenParsed, 'TODO EL TOKEN');
        //console.log(this.nombre=keycloakAngular.getKeycloakInstance().tokenParsed["given_name"], 'EL NOMBRE')
        this.username=keycloakAngular.getKeycloakInstance().tokenParsed["preferred_username"];
        this.firstName=keycloakAngular.getKeycloakInstance().tokenParsed["given_name"];
        this.email=keycloakAngular.getKeycloakInstance().tokenParsed["email"];
        this.roles=keycloakAngular.getKeycloakInstance().tokenParsed["resource_access"]["compras"]["roles"];
        this.area = keycloakAngular.getKeycloakInstance().profile['attributes']['department'];
        this.username='blopez';
    }

    toString() {
        return `Nombre: ${this.firstName}`;
    }


}