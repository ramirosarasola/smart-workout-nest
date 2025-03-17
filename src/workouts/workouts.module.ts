import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { Routine } from 'src/routines/entities';
import { User } from 'src/auth/entities/user.entity';
import { Workout } from './entities/workout.entity';
import { WorkoutExercise } from './entities/workout-exercise.entity';

@Module({
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  imports: [
    TypeOrmModule.forFeature([Routine, User, Workout, WorkoutExercise]),
  ],
})
export class WorkoutsModule {}
