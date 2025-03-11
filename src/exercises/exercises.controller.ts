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
import { v4 as uuid } from 'uuid';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get('')
  findAllExercises() {
    return this.exercisesService.findAll();
  }

  @Get(':id')
  findExerciseById(@Param('id', ParseUUIDPipe) id: string) {
    return this.exercisesService.findOne(id);
  }

  @Post()
  createExercise(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create({
      id: uuid(),
      name: createExerciseDto.name,
    });
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
    @Body() updates: { name: string },
  ) {
    return this.exercisesService.update(id, updates);
  }

  @Delete(':id')
  deleteExercise(@Param('id', ParseUUIDPipe) id: string) {
    return this.exercisesService.delete(id);
  }
}
