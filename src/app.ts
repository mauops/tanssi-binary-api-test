import 'reflect-metadata';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { FilesRoute } from './routes/files.route';

export class App {
  app: express.Application;
  env: string;
  port: string | number;

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
  }

  listen() {
    this.#initializeMiddlewares();
    this.#initializeRoutes();
    this.#initializeErrorHandling();

    this.app.listen(this.port, () => {
      logger.info(`=======================================================`);
      logger.info(`ENV: ${this.env} | 🚀 App listening on the port ${this.port}`);
      logger.info(`=======================================================`);
    });
  }

  getServer() {
    return this.app;
  }

  #initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 800000 }));
  }

  #initializeRoutes() {
    const filesRoute = new FilesRoute();

    this.app.use('/', filesRoute.router);
  }

  #initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
