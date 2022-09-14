import { KeycloakService, KeycloakConfig } from 'keycloak-angular';
import { KeycloakOptions } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  let options:KeycloakOptions={
    config:environment.keycloak,
    enableBearerInterceptor: false,
    initOptions:environment.kcInitOtions
  }
  return (): Promise<any> => keycloak.init(options);
} 