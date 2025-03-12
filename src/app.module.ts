import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercisesModule } from './exercises/exercises.module';
import { CategoriesModule } from './categories/categories.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [ExercisesModule, CategoriesModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
