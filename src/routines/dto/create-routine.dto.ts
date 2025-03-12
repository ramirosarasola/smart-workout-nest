import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateRoutineDto {
  @IsString()
  @MinLength(2)
  readonly name: string;

  @IsString()
  @MinLength(2)
  readonly description: string;

  @IsString()
  @MinLength(2)
  readonly slug: string;

  @IsString()
  @IsIn(['begginer', 'intermediate', 'advanced'])
  @MinLength(2)
  @IsOptional()
  readonly level?: string;

  // @IsArray()
  // @IsString({ each: true })
  // @IsIn(['begginer', 'intermediate', 'advanced'])
  // readonly focusMuscleGroup: string[];
}
