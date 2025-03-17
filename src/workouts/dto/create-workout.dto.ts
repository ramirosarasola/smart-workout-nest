import { IsString } from 'class-validator';

export class CreateWorkoutDto {
  @IsString()
  readonly userId: string;
}
