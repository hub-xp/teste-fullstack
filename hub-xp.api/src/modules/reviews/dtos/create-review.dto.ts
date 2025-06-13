import { IsNotEmpty, IsNumber, IsString, IsMongoId } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsMongoId()
  bookId: string;

  @IsNotEmpty()
  @IsNumber()
  reviewCount: number;

  @IsNotEmpty()
  @IsString()
  avaliation: string;
} 