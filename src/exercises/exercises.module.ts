import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseMuscle } from 'src/exercise-muscle/entities/exercise-muscle.entity';
import { FilesModule } from 'src/files/files.module';
import { Muscle } from 'src/muscles/entities/muscle.entity';
import { ExerciseImage } from './entities/exercise-image.entity';
import { Exercise } from './entities/exercise.entity';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService],
  imports: [
    FilesModule,
    ConfigModule,
    TypeOrmModule.forFeature([Exercise, ExerciseMuscle, Muscle, ExerciseImage]),
  ],
  exports: [ExercisesService],
})
export class ExercisesModule {}
