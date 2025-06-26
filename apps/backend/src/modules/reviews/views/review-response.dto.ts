import { Types } from 'mongoose';

export class ReviewResponseDto {
  _id: string;
  book: Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
}
