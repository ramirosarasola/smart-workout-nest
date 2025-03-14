import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Files } from './decorator/files.decorator';
import { FilesService, UploadFileResponse } from './files.service';
import { MultipartInterceptor } from './interceptor/multipart.interceptor';
import { FastifyReply } from 'fastify';
import { dirname } from 'path';
import { existsSync } from 'fs';

interface UploadDto {
  name: string;
}

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('routines/:fileName')
  findStaticResource(
    @Param('fileName') fileName: string,
    @Res() reply: FastifyReply,
  ) {
    const filePath = this.filesService.getStaticRoutineImages(fileName);

    console.log('Ruta del archivo:', filePath);
    console.log('Nombre del archivo:', fileName);

    if (!existsSync(filePath)) {
      throw new BadRequestException(`No routine found with image ${fileName}`);
    }

    return reply.sendFile(fileName, dirname(filePath));
  }

  @Post('routines')
  @UseInterceptors(
    MultipartInterceptor({
      fileType: /^(image\/(jpeg|png|gif)|video\/(mp4|webm|x-msvideo))$/,
      maxFileSize: 20 * 1024 * 1024, // 20MB
    }),
  )
  async upload(
    @Files() files: Record<string, Storage.MultipartFile[]>,
    @Body() body: UploadDto,
  ) {
    console.log(body);
    const savedFiles: UploadFileResponse[] =
      await this.filesService.uploadFile(files); // or any other storage
    // return with secure url
    const res = savedFiles.map((file: UploadFileResponse) => ({
      secureUrl: `${this.configService.get('HOST_API')}/files/routines/${file.filename}`,
    }));
    console.log(res);
    return res;
  }
}
