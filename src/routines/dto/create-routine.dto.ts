import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsLowercase,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateRoutineDto {
  @IsString()
  @MinLength(2)
  @ApiProperty()
  readonly name: string;

  @IsString()
  @MinLength(2)
  @ApiProperty()
  readonly description: string;

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

  // @IsArray()
  // @IsString({ each: true })
  // @IsIn(['begginer', 'intermediate', 'advanced'])
  // readonly focusMuscleGroup: string[];
}
