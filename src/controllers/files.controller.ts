import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import fs from 'fs';
import { FilesService } from '@/services/files.service';
import { SpecFile } from '@/interfaces/files.interface';

export class FilesController {
  files = Container.get(FilesService);

  createFiles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filesData: SpecFile = req.body;
      const createFilesData = await this.files.createFiles(filesData);

      res.status(201).json({ data: createFilesData, message: 'created' });
    } catch (error) {
      fs.rmSync('./spec/client.json');
      next(error);
    }
  };
}
