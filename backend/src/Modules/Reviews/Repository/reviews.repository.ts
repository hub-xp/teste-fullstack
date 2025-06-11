import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDTO } from '../Dtos/create-review.dto';
import { Review } from '../Entity/review.entity';

@Injectable()
export class ReviewsRepository {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewRepository: Model<Review>,
  ) {}

  public async create(payload: CreateReviewDTO) {
    const review = await this.reviewRepository.create(payload);
    return review;
  }

  public async findByBookId(bookId: string) {
    const reviews = await this.reviewRepository.find({ bookId }).sort({ createdAt: -1 });
    return reviews;
  }

  public async findTopRatedBooks(limit: string) {
    const reviews = await this.reviewRepository.aggregate([
      {
        $group: {
          _id: '$bookId',
          avgRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 }
        }
      },
      {
        $sort: { avgRating: -1 }
      },
      {
        $limit: Number(limit)
      },
      {
        $project: {
          bookId: '$_id',
          avgRating: { $round: ['$avgRating', 1] },
          reviewCount: 1,
          _id: 0
        }
      }
    ]);

    return reviews;
  }

  public async destroy(id: string) {
    await this.reviewRepository.findByIdAndDelete(id);
  }



}
