import { IsNotEmpty } from 'class-validator';

export class CreateReviewDTO {
  @IsNotEmpty({ message: 'Rating is required' } as any)
  rating: number;

  @IsNotEmpty({ message: 'Book ID is required' } as any)
  bookId: string;

  @IsNotEmpty({ message: 'User name is required' } as any)
  userName: string;
}
