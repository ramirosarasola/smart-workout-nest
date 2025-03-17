import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routine, RoutineImage } from './entities';
import { RoutinesController } from './routines.controller';
import { RoutinesService } from './routines.service';
import { RoutineExercise } from './entities/routine-exercise.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RoutinesController],
  providers: [RoutinesService],
  imports: [
    TypeOrmModule.forFeature([
      Routine,
      RoutineImage,
      RoutineExercise,
      Exercise,
    ]),
    AuthModule,
  ],
  exports: [RoutinesService],
})
export class RoutinesModule {}
