import { Injectable } from '@nestjs/common';
import { ExercisesService } from 'src/exercises/exercises.service';
import { RoutinesService } from 'src/routines/routines.service';
// import { CATEGORIES_SEED, EXERCISES_SEED } from './data/seed-db';

@Injectable()
export class SeedService {
  constructor(
    private readonly exercisesService: ExercisesService,
    private readonly routineService: RoutinesService,
  ) {}

  async populateDB() {
    // this.categoriesService.fillCategoriesWithSeedData(CATEGORIES_SEED);
    // this.exercisesService.fillExercisesWithSeedData(EXERCISES_SEED);
    // await this.exercisesService.deleteAllRoutines();
    await this.routineService.deleteAllRoutines();

    return 'Database populated successfully 😊';
  }
}
