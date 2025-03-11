import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Exercise } from './interfaces/exercise.interface';
import { v4 as uuid } from 'uuid';

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

  findOne(id: string): Exercise | undefined {
    const exercise = this.exercises.find((ex) => ex.id === id);
    if (exercise) throw new NotFoundException();
    return exercise;
  }

  findAll(): Exercise[] {
    return this.exercises;
  }

  create(exercise: { id: string; name: string }): Exercise {
    const alreadyExist = this.exercises.find(
      (ex) => ex.id === exercise.id || ex.name === exercise.name,
    );

    if (alreadyExist)
      throw new BadRequestException(`The ID or the Name already exists :/`);
    this.exercises.push(exercise);
    return exercise;
  }

  update(id: string, updates: { name: string }): Exercise | undefined {
    const exercise = this.exercises.find((ex) => ex.id === id);

    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }

    this.exercises = this.exercises.map((ex) =>
      ex.id === id ? Object.assign(exercise, updates) : ex,
    );

    return this.exercises.find((ex) => ex.id === id);
  }

  delete(id: string): void {
    const ex = this.exercises.find((ex) => ex.id === id);
    if (!ex) throw new NotFoundException(`Exercise with ID: ${id} not found`);
    this.exercises = this.exercises.filter((ex) => ex.id !== id);
  }
}
