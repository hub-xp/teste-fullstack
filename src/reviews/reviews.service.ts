import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './review.schema';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async create(data: Partial<Review>): Promise<Review> {
    return this.reviewModel.create(data);
  }

  async findAllByBook(bookId: string): Promise<Review[]> {
    const reviews = await this.reviewModel
      .find({ book: bookId })
      .sort({ createdAt: -1 })
      .exec();
    const avgRating = reviews.length
      ? reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length
      : 0;
    return { reviews, avgRating } as any;
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id).exec();
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async update(id: string, data: Partial<Review>): Promise<Review> {
    const review = await this.reviewModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async remove(id: string): Promise<void> {
    const res = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Review not found');
  }
}
