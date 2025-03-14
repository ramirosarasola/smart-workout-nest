import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  constructor() {}

  uploadFile(files: Record<string, Storage.MultipartFile[]>) {
    return files.file.map((file: Storage.MultipartFile) => {
      return {
        filename: file.filename,
        mimetype: file.mimetype,
        size: file.size,
      };
    });
  }
}
