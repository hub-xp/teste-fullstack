import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsNumber()
  reviewCount?: number;

  @IsOptional()
  @IsString()
  avaliation?: string;
} 