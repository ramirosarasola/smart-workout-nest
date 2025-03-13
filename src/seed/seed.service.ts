import { Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { CATEGORIES_SEED } from './data';

@Injectable()
export class SeedService {
  constructor(private readonly categoriesService: CategoriesService) {}

  populateDB() {
    this.categoriesService.fillCategoriesWithSeedData(CATEGORIES_SEED);

    return 'Database populated successfully 😊';
  }
}
