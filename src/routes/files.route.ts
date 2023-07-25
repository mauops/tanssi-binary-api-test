import { Router } from 'express';
import { FilesController } from '@/controllers/files.controller';
import { CreateFilesDto } from '@/dtos/files.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class FilesRoute implements Routes {
  path = '/files';
  router = Router();
  files = new FilesController();

  constructor() {
    this.#initializeRoutes();
  }

  #initializeRoutes() {
    // this.router.post(`${this.path}`, ValidationMiddleware(CreateFilesDto), this.files.createFiles);
    this.router.post(`${this.path}`, this.files.createFiles);
  }
}
