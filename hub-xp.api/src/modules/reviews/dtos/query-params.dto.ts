import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class QueryParamsDTO {
  @IsOptional()
  @IsString()
  page?: number;

  @IsOptional()
  @IsString()
  limit?: number;

  @IsOptional()
  @IsString()
  reviewCount?: number;

  @IsOptional()
  @IsString()
  avaliation?: string;
}
