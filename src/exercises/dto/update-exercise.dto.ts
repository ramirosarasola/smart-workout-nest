import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateExerciseDto {
  @IsOptional()
  @IsUUID()
  readonly id?: string;

  @IsString()
  readonly name: string;
}
