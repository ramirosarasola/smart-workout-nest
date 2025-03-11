import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExercisesService } from './exercises.service';
import { Exercise } from './interfaces/exercise.interface';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get('')
  findAllExercises(): Exercise[] {
    return this.exercisesService.findAll();
  }

  @Get(':id')
  findExerciseById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Exercise | undefined {
    return this.exercisesService.findOneById(id);
  }

  @Post()
  createExercise(@Body() createExerciseDto: CreateExerciseDto): Exercise {
    return this.exercisesService.create(createExerciseDto);
  }

  @Patch(':id')
  updateExercise(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    id: string,
    @Body()
    updateExerciseDto: UpdateExerciseDto,
  ): Exercise | undefined {
    return this.exercisesService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  deleteExercise(@Param('id', ParseUUIDPipe) id: string): void {
    return this.exercisesService.delete(id);
  }
}
