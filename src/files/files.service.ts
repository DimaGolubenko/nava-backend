// Core
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

// Types
import { IFileResponse } from './file.interface';

@Injectable()
export class FilesService {
  async saveFiles(
    files: Express.Multer.File[],
    folder: string = 'root',
  ): Promise<IFileResponse[]> {
    try {
      const uploadFolder = `${path}/uploads/${folder}`;
      await ensureDir(uploadFolder);

      const res: IFileResponse[] = await Promise.all(
        files.map(async (file) => {
          await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
          return {
            url: `/uploads/${folder}/${file.originalname}`,
            name: file.originalname,
          };
        }),
      );
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
