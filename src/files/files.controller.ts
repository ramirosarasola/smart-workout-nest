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
  body: any;
}

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get(':resource/:fileName')
  findStaticResource(
    @Param('resource') resource: string,
    @Param('fileName') fileName: string,
    @Res() reply: FastifyReply,
  ) {
    const filePath = this.filesService.getStaticRoutineImages(
      fileName,
      resource,
    );

    console.log('Ruta del archivo:', filePath);
    console.log('Nombre del archivo:', fileName);

    if (!existsSync(filePath)) {
      throw new BadRequestException(
        `No ${resource} found with image ${fileName}`,
      );
    }

    return reply.sendFile(fileName, dirname(filePath));
  }

  @Post('upload/:resource')
  @UseInterceptors(
    MultipartInterceptor({
      fileType: /^(image\/(jpeg|png|gif)|video\/(mp4|webm|x-msvideo))$/,
      maxFileSize: 20 * 1024 * 1024, // 20MB
    }),
  )
  async upload(
    @Files() files: Record<string, Storage.MultipartFile[]>,
    @Body() body: UploadDto,
    @Param('resource') resource: string,
  ) {
    // Valido que si se envio un body estra
    if (JSON.stringify(body) !== '{}') {
      if (typeof body.body !== 'string') {
        throw new BadRequestException('Invalid body format');
      }
      const parsedBody = JSON.parse(body.body) as Record<string, any>;
      console.log(parsedBody);
    }

    // or any other storage
    const savedFiles: UploadFileResponse[] = await this.filesService.uploadFile(
      files,
      resource,
    );
    // return with secure url
    const res = savedFiles.map((file: UploadFileResponse) => ({
      secureUrl: `${this.configService.get('HOST_API')}/files/${resource}/${file.filename}`,
    }));
    return res;
  }
}
