import {
  IsInt,
  IsString,
  IsNotEmpty,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  book: string;

  @IsString()
  @IsOptional()
  reviewer: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  comment?: string;
}
