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
  production: true,
  keycloak: keycloakConfig,
  kcInitOtions:kcInitOtions,
  urlBaseLX:'https://apilx.bellota.co/RestLXCompras',
  urlBaseBD:'/compras',
  headerWSLX:'Bearer Q09MTFg4MzVG'
};
