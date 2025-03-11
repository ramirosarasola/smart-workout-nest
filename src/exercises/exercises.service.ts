import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Exercise } from './interfaces/exercise.interface';
import { v4 as uuid } from 'uuid';
import { CreateExerciseDto, UpdateExerciseDto } from './dto';

@Injectable()
export class ExercisesService {
  private exercises: Exercise[] = [
    {
      id: uuid(),
      name: 'Chest Press',
    },
    {
      id: uuid(),
      name: 'Pull Ups',
    },
    {
      id: uuid(),
      name: 'Push Ups',
    },
  ];

  findOneById(id: string): Exercise | undefined {
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
    const exercise = this.findOneById(id);

    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }

    this.exercises = this.exercises.map((ex: Exercise) =>
      ex.id === id
        ? Object.assign(exercise, { ...exercise, ...updateExerciseDto, id })
        : ex,
    );

    return this.findOneById(id);
  }

  delete(id: string): void {
    this.findOneById(id);
    this.exercises = this.exercises.filter((ex) => ex.id !== id);
  }
}
