import { IsOptional, IsString, IsUUID } from 'class-validator';

// export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
export class UpdateCategoryDto {
  @IsUUID()
  @IsOptional()
  readonly id?: string;
  @IsString()
  @IsOptional()
  readonly name?: string;
  @IsString()
  @IsOptional()
  readonly description?: string;
}
