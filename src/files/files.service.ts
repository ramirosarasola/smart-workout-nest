import { MultipartFile } from '@fastify/multipart';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { extname, join } from 'path';

export interface UploadFileResponse {
  filename: string;
  mimetype: string;
  size: string | number;
  path: string;
}

@Injectable()
export class FilesService {
  private uploadDir = join(__dirname, '../../static');

  constructor() {
    // Crear el directorio si no existe
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(
    files: Record<string, MultipartFile[]>,
    resource: string,
  ): Promise<UploadFileResponse[]> {
    const savedFiles: {
      filename: string;
      mimetype: string;
      size: string | number;
      path: string;
    }[] = [];

    // VALIDAR QUE SE ENVIARON ARCHIVOS
    if (!files.file) {
      throw new BadRequestException('No files uploaded.');
    }

    const { file: fileArr } = files;
    const resourcePath = join(this.uploadDir, resource);

    for (const file of fileArr) {
      const buffer = await file.toBuffer();
      const uniqueName = crypto.randomUUID() + extname(file.filename);
      const filePath = join(resourcePath, uniqueName);

      writeFileSync(filePath, buffer);

      savedFiles.push({
        filename: uniqueName,
        mimetype: file.mimetype,
        size: file.file.truncated ? 'exceeded limit' : buffer.length,
        path: filePath,
      });
    }

    return savedFiles;
  }

  getStaticRoutineImages(imageName: string, resource: string) {
    const path = join(__dirname, `../../static/${resource}`, imageName);

    if (!existsSync(path)) {
      throw new NotFoundException(
        `No ${resource} found with image ${imageName}`,
      );
    }
    return path;
  }
}
