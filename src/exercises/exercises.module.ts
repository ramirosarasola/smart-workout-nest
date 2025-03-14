import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseMuscle } from 'src/exercise-muscle/entities/exercise-muscle.entity';
import { Muscle } from 'src/muscles/entities/muscle.entity';
import { Exercise } from './entities/exercise.entity';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { ExerciseImage } from './entities/exercise-image.entity';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService],
  imports: [
    TypeOrmModule.forFeature([Exercise, ExerciseMuscle, Muscle, ExerciseImage]),
  ],
  exports: [ExercisesService],
})
export class ExercisesModule {}
