import { Injectable } from '@nestjs/common';
import { ExercisesService } from 'src/exercises/exercises.service';
import { RoutinesService } from 'src/routines/routines.service';
import { EXERCISES_SEED, MUSCLES_SEED } from './data/seed-db';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { MusclesService } from 'src/muscles/muscles.service';
import { Muscle } from 'src/muscles/entities/muscle.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly exercisesService: ExercisesService,
    private readonly routineService: RoutinesService,
    private readonly muscleService: MusclesService,
  ) {}

  async populateDB() {
    await this.insertNewData();
    return 'Database populated successfully 😊';
  }

  private async insertNewData() {
    await this.routineService.deleteAllRoutines();
    await this.exercisesService.deleteAllExercises();
    await this.muscleService.deleteAllMuscles();

    const muscles = MUSCLES_SEED;
    const exercises = EXERCISES_SEED;

    // Primero, insertar todos los músculos
    const musclesCreated: (Muscle | undefined)[] = await Promise.all(
      muscles.map((muscle) => this.muscleService.create(muscle)),
    );

    console.log('Músculos insertados:', musclesCreated);

    // Luego, insertar todos los ejercicios
    const results: (Exercise | undefined)[] = await Promise.all(
      exercises.map((exercise) => this.exercisesService.create(exercise)),
    );

    console.log('Ejercicios insertados:', results);

    return true;
  }
}
