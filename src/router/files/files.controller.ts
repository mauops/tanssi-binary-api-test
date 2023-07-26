import { FilesService } from '@/router/files/files.service';
import { NextFunction, Request, Response, Router } from 'express';
import { rmSync, rmdirSync } from 'fs';
import { join } from 'path';

export class FilesController {
  public readonly router: Router = Router();

  constructor(private filesService: FilesService) {
    // TODO: Add validation
    this.router.post('/spec-raw', this.createFiles);
  }

  private createFiles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filesData = req.body;
      const rawSpec = this.filesService.createRawSpec(filesData);

      res.status(201).json({ data: rawSpec.toString(), message: 'Raw spec successfully created' });
    } catch (error) {
      const specDir: string = join(__dirname, '../../../spec');

      rmSync(`${specDir}/spec.json`);
      rmdirSync(specDir);

      next(error);
    }
  };
}
