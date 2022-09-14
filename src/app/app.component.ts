import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { DataService } from './services/data.service';
import { Usuario } from './interface/usuario';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  display: boolean;
  auditor: string;
  public mostrar = true;
  public sesion: boolean = true;
  public usuario: Usuario;
  public items: MenuItem[];
  constructor(
    protected router: Router,
    protected keycloakAngular: KeycloakService,
    protected dataService: DataService,
    protected PanelMenuModule: PanelMenuModule
  ) {
    //  this.usuario = new Usuario(this.keycloakAngular);
    //  console.log(this.usuario);
  }

  ngOnInit() {
    this.dataService.sesion$.subscribe(bandera => {
      this.sesion = bandera;
    });

    this.dataService.mostrar$.subscribe(bandera => {
      this.mostrar = bandera;
    });

    this.items = [
      { label: 'Inicio', icon: 'pi pi-pw pi-home', routerLink: '/inicio', command : (event: Event) => { this.hide() } },

      { label: 'Requisiciones', icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Administrar', icon: 'pi pi-fw pi-sitemap',
            items: [
              { label: 'Cadenas', icon: 'pi pi-fw pi-chart-bar', routerLink: '/admin', command : (event: Event) => {this.hide()} },
              { label: 'Requisiciones', icon: 'pi pi-fw pi-money-bill', routerLink: '/adminReq', command : (event: Event) => {this.hide()} }
            ]
          },
          { label: 'Crear Requisición', icon: 'pi pi-fw pi-file-o', routerLink: '/crear/requisicion', command : (event: Event) => {this.hide()} },
          { label: 'Mis Requisiciones', icon: 'pi pi-fw pi-id-card', routerLink: '/registro', command : (event: Event) => {this.hide()} },
          { label: 'Historial Requisiciones', icon: 'pi pi-fw pi-calendar', routerLink: '/historial', command : (event: Event) => {this.hide()} },
          { label: 'Cotizar Requisición', icon: 'pi pi-pi pi-check', routerLink: '/cotizar', command : (event: Event) => {this.hide()} },
          { label: 'Auditoria Requisiciones', icon: 'pi pi-pi pi-search-plus', routerLink: '/requisiciones', command : (event: Event) => {this.hide()} },
          { label: 'Aprobaciones', icon: 'pi pi-fw pi-directions-alt', routerLink: '/aprobar', command : (event: Event) => {this.hide()} }
        ]
      },
      {
        label: 'Legalizaciones', icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Administrar', icon: 'pi pi-fw pi-sitemap',
            items: [
              { label: 'Cadenas', icon: 'pi pi-fw pi-chart-bar', routerLink: 'admin/legalizacion', command : (event: Event) => {this.hide()} },
            ]
          },
          { label: 'Crear Legalización', icon: 'pi pi-fw pi-file-o', routerLink: '/crear/legalizacion', command : (event: Event) => {this.hide()} },
          { label: 'Mis Legalizaciones', icon: 'pi pi-fw pi-id-card', routerLink: '/registro', command : (event: Event) => {this.hide()} },
          { label: 'Historial Legalizaciones', icon: 'pi pi-fw pi-calendar', routerLink: '/historial', command : (event: Event) => {this.hide()} },
        ]
      },
      {
        label: 'Orden Compra', icon: 'pi pi-fw pi-compass',
        items: [
          { label: 'Asignar Cadena', icon: 'pi pi-fw pi-sort-amount-down', routerLink: '/ordenCompra', command : (event: Event) => {this.hide()} },
          { label: 'Admin Provedores', icon: 'pi pi-fw pi-palette', routerLink: '/adminProv', command : (event: Event) => {this.hide()} },
          { label: 'Enviar Ordenes', icon: 'pi pi-fw pi-list', routerLink: '/correoProv', command : (event: Event) => {this.hide()} },
          { label: 'Historial Orden de Compra', icon: 'pi pi-fw pi-table', routerLink: '/historialoc', command : (event: Event) => {this.hide()} },
        ]
      },
      // {
      //   label: 'Aprobaciones',
      //   icon: 'pi pi-fw pi-user',
      //   items: [
          /*,
          {
            label: 'Aprobar Legalización',
            icon: 'pi pi-fw pi-thumbs-up',
            routerLink: '/aprobarLega',
            command : (event: Event) => {this.hide()}
          },
          {
            label: 'Aprobar Orden de Compra',
            icon: 'pi pi-fw pi-key',
            routerLink: '/aprobarOC',
            command : (event: Event) => {this.hide()}
          }*/
      //   ]
      // },
      { label: 'Recepción', icon: 'pi pi-fw pi-cloud-download',
        items: [
          { label: 'Recepción Por Producto', icon: 'pi pi-fw pi-star-o', routerLink: '/recepcionoc', command : (event: Event) => {this.hide()} },
          { label: 'Recepción Por Orden de Compra', icon: 'pi pi-fw pi-file', routerLink: '/recepcionordencompra', command : (event: Event) => {this.hide()}}
        ]
      },
      { label: 'Cerrar Sesión', icon: 'pi pi-fw pi-sign-out', routerLink: '/inicio', command : (event: Event) => {this.logout()} }
    ];
  }

  title = 'Compras';
  logout() {
    this.keycloakAngular.logout(window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/inicio');
  }

  hide(){
     this.display=false;
  }
}
