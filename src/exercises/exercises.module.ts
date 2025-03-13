import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseMuscle } from 'src/exercise-muscle/entities/exercise-muscle.entity';
import { Muscle } from 'src/muscles/entities/muscle.entity';
import { Exercise } from './entities/exercise.entity';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService],
  imports: [TypeOrmModule.forFeature([Exercise, ExerciseMuscle, Muscle])],
})
export class ExercisesModule {}
