import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { MultipartInterceptor } from 'src/files/interceptor/multipart.interceptor';
import { Files } from 'src/files/decorator/files.decorator';
import { FilesService, UploadFileResponse } from 'src/files/files.service';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

@Controller('exercises')
export class ExercisesController {
  constructor(
    private readonly exercisesService: ExercisesService,
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Post('no-images')
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Post()
  @UseInterceptors(
    MultipartInterceptor({
      fileType: /^(image\/(jpeg|png|gif)|video\/(mp4|webm|x-msvideo))$/,
      maxFileSize: 20 * 1024 * 1024, // 20MB
    }),
  )
  async upload(
    @Files() files: Record<string, Storage.MultipartFile[]>,
    @Body('data') data: string,
  ) {
    // Valido que si se envio un body estra
    if (typeof data !== 'string') {
      throw new BadRequestException('Invalid data format. Must be a string.');
    }
    const exerciseData: unknown = JSON.parse(data); // Convertimos string a JSON

    // Valido que los datos sean del tipo CreateExerciseDto
    const exerciseDto = plainToInstance(CreateExerciseDto, exerciseData);
    // 🔹 2. Validar el DTO manualmente
    const errors = validateSync(exerciseDto);
    if (errors.length > 0) {
      console.log(errors);
      const errorMessages: string[][] = [];
      errors.forEach((error) => {
        if (error && error.constraints)
          errorMessages.push(Object.values(error.constraints));
      });
      throw new BadRequestException(errorMessages);
    }

    // or any other storage
    const savedFiles: UploadFileResponse[] = await this.filesService.uploadFile(
      files,
      'exercises',
    );
    // return with secure url
    const res = savedFiles.map((file: UploadFileResponse) => ({
      secureUrl: `${this.configService.get('HOST_API')}/files/exercises/${file.filename}`,
    }));

    const exercise = await this.exercisesService.create(
      exerciseData as CreateExerciseDto,
    );

    return {
      ...exercise,
      images: res,
    };
  }

  @Get()
  findAll() {
    return this.exercisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exercisesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return this.exercisesService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesService.remove(id);
  }
}
