import { Container } from 'inversify';

import { AuthService } from './auth-service.interface.js';
import { COMPONENT_MAP } from '../../types/index.js';
import { DefaultAuthService } from './default-auth.service.js';
import { ExceptionFilter } from '../../libs/rest/index.js';
import { AuthExceptionFilter } from './auth.exception-filter.js';

export function createAuthContainer() {
  const authContainer = new Container();
  authContainer.bind<AuthService>(COMPONENT_MAP.AUTH_SERVICE).to(DefaultAuthService).inSingletonScope();
  authContainer.bind<ExceptionFilter>(COMPONENT_MAP.AUTH_EXCEPTION_FILTER).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;
}
