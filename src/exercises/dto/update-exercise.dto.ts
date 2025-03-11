import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateExerciseDto {
  @IsOptional()
  @IsUUID()
  readonly id?: string;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly level?: string;

  @IsOptional()
  @IsArray()
  readonly muscles?: string[];
}
