import { MultipartFile } from '@fastify/multipart';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  private uploadDir = path.join(__dirname, '../../static/exercises');

  constructor() {
    // Crear el directorio si no existe
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(files: Record<string, MultipartFile[]>) {
    const savedFiles: {
      filename: string;
      mimetype: string;
      size: string | number;
      path: string;
    }[] = [];
    console.log(files.file);

    const { file: fileArr } = files;

    for (const file of fileArr) {
      const buffer = await file.toBuffer();
      const uniqueName = crypto.randomUUID() + path.extname(file.filename);
      const filePath = path.join(this.uploadDir, uniqueName);

      fs.writeFileSync(filePath, buffer);

      savedFiles.push({
        filename: uniqueName,
        mimetype: file.mimetype,
        size: file.file.truncated ? 'exceeded limit' : buffer.length,
        path: filePath,
      });
    }

    return savedFiles;
  }
}
