import { PartialType } from '@nestjs/swagger';
import { CreateExerciseMuscleDto } from './create-exercise-muscle.dto';

export class UpdateExerciseMuscleDto extends PartialType(CreateExerciseMuscleDto) {}
