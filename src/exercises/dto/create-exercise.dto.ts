import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  IsIn,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class MuscleActivationDto {
  @IsString()
  muscleName: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  activationLevel: number;
}

export class CreateExerciseDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  @IsOptional()
  @IsIn(['Beginner', 'Intermediate', 'Advanced'])
  readonly difficultyLevel?: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  readonly relativeLoad: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  readonly stabilityRequirement: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  readonly rangeOfMotion: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  readonly technicalDemand: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MuscleActivationDto)
  readonly muscleActivations: MuscleActivationDto[];
}
