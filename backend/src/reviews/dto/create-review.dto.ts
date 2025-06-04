import { IsInt, IsMongoId, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsMongoId()
  bookId: string;

  @IsString()
  @IsNotEmpty()
  reviewer: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  comment: string;
}
