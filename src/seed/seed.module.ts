import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { RoutinesModule } from 'src/routines/routines.module';
import { ExercisesModule } from 'src/exercises/exercises.module';
import { MusclesModule } from 'src/muscles/muscles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    CategoriesModule,
    RoutinesModule,
    ExercisesModule,
    MusclesModule,
    AuthModule,
  ],
})
export class SeedModule {}
