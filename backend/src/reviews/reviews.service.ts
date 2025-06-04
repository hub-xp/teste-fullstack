import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create({
      ...dto,
      bookId: new Types.ObjectId(dto.bookId),
    });
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async findByBook(bookId: string): Promise<Review[]> {
    return this.reviewModel
      .find({ bookId: new Types.ObjectId(bookId) })
      .sort({ createdAt: -1 })
      .exec();
  }
}
