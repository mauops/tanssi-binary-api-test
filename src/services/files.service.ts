import { Files, SpecFile } from '@/interfaces/files.interface';
import childProcess from 'child_process';
import fs from 'fs';
import { Service } from 'typedi';

@Service()
export class FilesService {
  async createFiles(filesData: SpecFile): Promise<Files> {
    fs.writeFileSync('./spec/client.json', JSON.stringify(filesData), { encoding: 'utf8', flag: 'w' });

    const raw = childProcess.execSync(`/binary/container-chain-template-simple-node build-spec --chain /app/spec/client.json --raw`);

    fs.rmSync('./spec/client.json');

    return [raw.toString()];
  }
}
