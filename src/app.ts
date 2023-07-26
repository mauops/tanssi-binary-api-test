import { FilesController } from '@/router/files/files.controller';
import { FilesService } from '@/router/files/files.service';
import { LOG_FORMAT, NODE_ENV, ORIGIN, PORT } from '@config';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

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
    this.initializeMiddlewares();
    this.initializeRouter();
    this.initializeErrorHandling();

    this.app.listen(this.port, () => {
      logger.info(`=======================================================`);
      logger.info(`ENV: ${this.env} | 🚀 App listening on the port ${this.port}`);
      logger.info(`=======================================================`);
    });
  }

  getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 800000 }));
  }

  private initializeRouter() {
    const filesService = new FilesService();
    const filesController = new FilesController(filesService);

    this.app.use('/files', filesController.router);
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
