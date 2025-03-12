import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { ExercisesModule } from 'src/exercises/exercises.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ExercisesModule, CategoriesModule],
})
export class SeedModule {}
