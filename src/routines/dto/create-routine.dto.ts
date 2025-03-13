import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsLowercase,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

class RoutineExerciseDto {
  @IsString()
  exerciseId: string;

  @IsNumber()
  sets: number;

  @IsNumber()
  reps: number;

  @IsNumber()
  restTime: number;
}

export class CreateRoutineDto {
  @IsString()
  @MinLength(2)
  @ApiProperty()
  readonly name: string;

  @IsString()
  @MinLength(2)
  @ApiProperty()
  readonly description: string;

  // Optionals
  @IsString()
  @MinLength(2)
  @IsOptional()
  @IsLowercase()
  @ApiProperty()
  readonly slug: string;

  @IsString()
  @IsIn(['begginer', 'intermediate', 'advanced'])
  @MinLength(2)
  @IsOptional()
  @ApiProperty()
  readonly level?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional() // Va a ser opcional, ya que podemos obtener su categoria segun las reps y sets realizados.
  @ApiProperty()
  readonly types: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional() // Va a ser opcional, ya que podemos obtener su categoria segun las reps y sets realizados.
  @ApiProperty()
  readonly images: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoutineExerciseDto)
  readonly exercises: RoutineExerciseDto[];
}
