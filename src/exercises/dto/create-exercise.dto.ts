// Los DTOs deben ser clases

import { IsString } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  readonly name: string;
}
