import { SpecFile, SpecRaw } from '@/router/files/files.interface';
import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync, rmdirSync, writeFileSync } from 'fs';
import { join } from 'path';

interface IFilesService {
  createRawSpec(filesData: SpecFile): SpecRaw;
}

export class FilesService implements IFilesService {
  createRawSpec(specFile: SpecFile): SpecRaw {
    const specDir: string = join(__dirname, '../../../spec');

    if (!existsSync(specDir)) {
      mkdirSync(specDir);
    }

    writeFileSync(`${specDir}/spec.json`, JSON.stringify(specFile), { encoding: 'utf8', flag: 'w' });

    const raw = execSync(`/binary/container-chain-template-simple-node build-spec --chain /app/spec/spec.json --raw`);

    rmSync(`${specDir}/spec.json`);
    rmdirSync(specDir);

    return raw.toString();
  }
}
