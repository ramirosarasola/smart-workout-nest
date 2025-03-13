import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsPositive()
  @IsOptional()
  @Type(() => Number) // enableImplicitConversinos: true
  readonly limit: number;

  @Min(0)
  @IsOptional()
  @Type(() => Number) // enableImplicitConversinos: true
  readonly offset: number;
}
