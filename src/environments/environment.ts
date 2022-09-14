// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { KeycloakConfig } from 'keycloak-angular';

let keycloakConfig: KeycloakConfig ={
    url: "https://auth.bellota.co:10443/auth",
    realm: 'bellotahub',
    clientId: 'compras',
    "credentials": {
      "secret": "71403dac-87be-4e85-ad79-7069985f48aa"
    }
  }; 

  let kcInitOtions: Keycloak.KeycloakInitOptions ={
      checkLoginIframe: false
    }; 


export const environment = {
  production: false,
  keycloak: keycloakConfig,
  kcInitOtions:kcInitOtions,
  //urlBaseLX:'http://69.75.205.57:10003/RestLXComprasTavo',
  //urlBaseLX:'http://69.75.205.57:10013/RestLXCompras',
  urlBaseLX:'https://apilx.bellota.co/RestLXCompras',
  //urlBaseLX:'http://localhost:8080/RestLXCompras',
  urlBaseBD:'/compras',
  headerWSLX:'Bearer Q09MTFg4MzVG'
 
  
 

};




/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
