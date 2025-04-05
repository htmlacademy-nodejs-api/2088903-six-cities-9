import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import cors from 'cors';

import { Logger } from '../shared/libs/logger/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { COMPONENT_MAP } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getFullServerPath, getMongoURI } from '../shared/helpers/index.js';
import { Controller, ExceptionFilter, ParseTokenMiddleware } from '../shared/libs/rest/index.js';
import {ROUTE_STATIC} from './rest.constant.js';


@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT_MAP.CONFIG) private readonly config: Config<RestSchema>,
    @inject(COMPONENT_MAP.DATABASE_CLIENT) private readonly databaseClient: DatabaseClient,
    @inject(COMPONENT_MAP.EXCEPTION_FILTER) private readonly appExceptionFilter: ExceptionFilter,
    @inject(COMPONENT_MAP.USER_CONTROLLER) private readonly userController: Controller,
    @inject(COMPONENT_MAP.OFFER_CONTROLLER) private readonly offerController: Controller,
    @inject(COMPONENT_MAP.COMMENT_CONTROLLER) private readonly commentController: Controller,
    @inject(COMPONENT_MAP.AUTH_EXCEPTION_FILTER) private readonly authExceptionFilter: ExceptionFilter,
    @inject(COMPONENT_MAP.HTTP_EXCEPTION_FILTER) private readonly httpExceptionFilter: ExceptionFilter,
    @inject(COMPONENT_MAP.VALIDATION_EXCEPTION_FILTER) private readonly validationExceptionFilter: ExceptionFilter,
  ) {
    this.server = express();
  }

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async _initControllers() {
    this.server.use('/users', this.userController.router);
    this.server.use('/offers', this.offerController.router);
    this.server.use('/comments', this.commentController.router);
  }

  private async _initMiddleware() {
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));
    this.server.use(express.json());
    this.server.use(
      ROUTE_STATIC.UPLOAD,
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.server.use(
      ROUTE_STATIC.FILES,
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.server.use(cors());
  }

  private async _initExceptionFilters() {
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
    this.server.use(this.httpExceptionFilter.catch.bind(this.httpExceptionFilter));
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init() {
    this.logger.info('Application initialization');

    this.logger.info('Init database');
    await this.initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init app-level middleware');
    await this._initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init controllers');
    await this._initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init exception filters');
    await this._initExceptionFilters();
    this.logger.info('Exception filters initialization completed');

    this.logger.info('Try to init server');
    await this._initServer();
    this.logger.info(`Server started on ${getFullServerPath(this.config.get('HOST'), this.config.get('PORT'))}`);
  }
}
