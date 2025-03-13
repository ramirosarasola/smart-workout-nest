import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExerciseMuscleService } from './exercise-muscle.service';
import { CreateExerciseMuscleDto } from './dto/create-exercise-muscle.dto';
import { UpdateExerciseMuscleDto } from './dto/update-exercise-muscle.dto';

@Controller('exercise-muscle')
export class ExerciseMuscleController {
  constructor(private readonly exerciseMuscleService: ExerciseMuscleService) {}

  @Post()
  create(@Body() createExerciseMuscleDto: CreateExerciseMuscleDto) {
    return this.exerciseMuscleService.create(createExerciseMuscleDto);
  }

  @Get()
  findAll() {
    return this.exerciseMuscleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseMuscleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExerciseMuscleDto: UpdateExerciseMuscleDto) {
    return this.exerciseMuscleService.update(+id, updateExerciseMuscleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseMuscleService.remove(+id);
  }
}
