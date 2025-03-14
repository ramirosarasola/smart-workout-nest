import { MultipartFile } from '@fastify/multipart';
import { Injectable, NotFoundException } from '@nestjs/common';
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
  private uploadDir = join(__dirname, '../../static/routines');

  constructor() {
    // Crear el directorio si no existe
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(
    files: Record<string, MultipartFile[]>,
  ): Promise<UploadFileResponse[]> {
    const savedFiles: {
      filename: string;
      mimetype: string;
      size: string | number;
      path: string;
    }[] = [];

    const { file: fileArr } = files;

    for (const file of fileArr) {
      const buffer = await file.toBuffer();
      const uniqueName = crypto.randomUUID() + extname(file.filename);
      const filePath = join(this.uploadDir, uniqueName);

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

  getStaticRoutineImages(imageName: string) {
    const path = join(__dirname, '../../static/routines', imageName);

    if (!existsSync(path)) {
      throw new NotFoundException(`No routine found with image ${imageName}`);
    }
    return path;
  }
}
