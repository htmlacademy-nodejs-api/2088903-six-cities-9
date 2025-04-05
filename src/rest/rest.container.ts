import { Container } from 'inversify';

import { RestApplication } from './rest.application.js';
import { COMPONENT_MAP } from '../shared/types/index.js';
import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { Config, RestConfig, RestSchema } from '../shared/libs/config/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../shared/libs/database-client/index.js';
import { AppExceptionFilter, ExceptionFilter, ValidationExceptionFilter } from '../shared/libs/rest/index.js';
import { HttpErrorExceptionFilter } from '../shared/libs/rest/exception-filter/http-error.exception-filter.js';
import { PathTransformer } from '../shared/libs/rest/transform/path-transformer.js';


export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(COMPONENT_MAP.REST_APPLICATION).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(COMPONENT_MAP.LOGGER).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(COMPONENT_MAP.CONFIG).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(COMPONENT_MAP.DATABASE_CLIENT).to(MongoDatabaseClient).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(COMPONENT_MAP.EXCEPTION_FILTER).to(AppExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(COMPONENT_MAP.HTTP_EXCEPTION_FILTER).to(HttpErrorExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(COMPONENT_MAP.VALIDATION_EXCEPTION_FILTER).to(ValidationExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<PathTransformer>(COMPONENT_MAP.PATH_TRANSFORMER).to(PathTransformer).inSingletonScope();


  return restApplicationContainer;
}
