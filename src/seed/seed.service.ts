import { Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { ExercisesService } from 'src/exercises/exercises.service';
import { CATEGORIES_SEED, EXERCISES_SEED } from './data';

@Injectable()
export class SeedService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly exercisesService: ExercisesService,
  ) {}

  populateDB() {
    this.categoriesService.fillCategoriesWithSeedData(CATEGORIES_SEED);
    this.exercisesService.fillExercisesWithSeedData(EXERCISES_SEED);

    return 'Database populated successfully 😊';
  }
}
