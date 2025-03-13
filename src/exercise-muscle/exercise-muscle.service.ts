import { Injectable } from '@nestjs/common';
import { CreateExerciseMuscleDto } from './dto/create-exercise-muscle.dto';
import { UpdateExerciseMuscleDto } from './dto/update-exercise-muscle.dto';

@Injectable()
export class ExerciseMuscleService {
  create(createExerciseMuscleDto: CreateExerciseMuscleDto) {
    return 'This action adds a new exerciseMuscle';
  }

  findAll() {
    return `This action returns all exerciseMuscle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exerciseMuscle`;
  }

  update(id: number, updateExerciseMuscleDto: UpdateExerciseMuscleDto) {
    return `This action updates a #${id} exerciseMuscle`;
  }

  remove(id: number) {
    return `This action removes a #${id} exerciseMuscle`;
  }
}
