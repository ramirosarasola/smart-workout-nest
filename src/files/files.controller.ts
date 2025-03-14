import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { Files } from './decorator/files.decorator';
import { MultipartInterceptor } from './interceptor/multipart.interceptor';

interface UploadDto {
  name: string;
}

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('exercise')
  @UseInterceptors(
    MultipartInterceptor({
      fileType: /^(image\/(jpeg|png|gif)|video\/(mp4|webm|x-msvideo))$/,
      maxFileSize: 20 * 1024 * 1024, // 20MB
    }),
  )
  upload(
    @Files() files: Record<string, Storage.MultipartFile[]>,
    @Body() body: UploadDto,
  ) {
    console.log(body);
    return this.filesService.uploadFile(files); // or any other storage
  }
}
