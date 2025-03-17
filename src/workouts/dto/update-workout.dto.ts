import { PartialType } from '@nestjs/swagger';
import { CreateWorkoutDto } from './create-workout.dto';
import { IsArray, IsString } from 'class-validator';
import { WorkoutRequestExercise } from '../interfaces/workout.interface';

export class UpdateWorkoutDto extends PartialType(CreateWorkoutDto) {
  @IsString()
  readonly id: string;

  @IsArray()
  readonly exercises: WorkoutRequestExercise[];
}
