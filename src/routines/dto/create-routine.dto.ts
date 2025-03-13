import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
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
}
