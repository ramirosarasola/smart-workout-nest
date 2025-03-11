// Los DTOs deben ser clases

import { IsArray, IsString } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly level: string;

  @IsArray()
  readonly muscles: string[];
}
