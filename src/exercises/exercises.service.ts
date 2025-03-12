import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateExerciseDto, UpdateExerciseDto } from './dto';
import { Exercise } from './interfaces/exercise.interface';

@Injectable()
export class ExercisesService {
  private exercises: Exercise[] = [
    {
      id: uuid(),
      name: 'Pike Push Ups',
      level: 'Begginer',
      muscles: ['chest', 'shoulder', 'triceps'],
    },
    {
      id: uuid(),
      name: 'Pull Ups',
      level: 'Begginer',
      muscles: ['back'],
    },
    {
      id: uuid(),
      name: 'Push Ups',
      level: 'Begginer',
      muscles: ['chest', 'triceps'],
    },
  ];

  findOneById(id: string): Exercise {
    const exercise = this.exercises.find((ex) => ex.id === id);
    if (!exercise) throw new NotFoundException();
    return exercise;
  }

  findAll(): Exercise[] {
    return this.exercises;
  }

  create(createExerciseDto: CreateExerciseDto): Exercise {
    const newExercise: Exercise = {
      id: uuid(),
      ...createExerciseDto,
    };

    const alreadyExist = this.exercises.find(
      (ex) => ex.id === newExercise.id || ex.name === newExercise.name,
    );

    if (alreadyExist)
      throw new BadRequestException(`The ID or the Name already exists :/`);
    this.exercises.push(newExercise);
    return newExercise;
  }

  update(
    id: string,
    updateExerciseDto: UpdateExerciseDto,
  ): Exercise | undefined {
    let exerciseToUpdate: Exercise = this.findOneById(id);

    if (!exerciseToUpdate) {
      throw new NotFoundException();
    }

    this.exercises = this.exercises
      .map((ex) => {
        if (ex.id === id) {
          exerciseToUpdate = {
            ...exerciseToUpdate,
            ...updateExerciseDto,
            id,
            name: updateExerciseDto.name ?? exerciseToUpdate.name,
            level: updateExerciseDto.level ?? exerciseToUpdate.level,
            muscles: updateExerciseDto.muscles ?? exerciseToUpdate.muscles,
          };
          return exerciseToUpdate;
        }
        return ex;
      })
      .filter((ex): ex is Exercise => ex !== undefined);

    return exerciseToUpdate;
  }

  delete(id: string): void {
    this.findOneById(id);
    this.exercises = this.exercises.filter((ex) => ex.id !== id);
  }

  fillCarsWithSeedData(exercises: Exercise[]) {
    this.exercises = exercises;
  }
}
