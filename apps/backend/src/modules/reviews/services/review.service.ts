import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from '../models/review.schema';
import { CreateReviewDto } from '../views/create-review.dto';
import { UpdateReviewDto } from '../views/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create(dto);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().populate('book').exec();
  }

  async findByBookId(bookId: string): Promise<Review[]> {
    return this.reviewModel.find({ book: bookId }).exec();
  }

  async update(id: string, dto: UpdateReviewDto): Promise<Review> {
    const updated = await this.reviewModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Review not found');
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.reviewModel.findByIdAndDelete(id).exec();
  }
}
