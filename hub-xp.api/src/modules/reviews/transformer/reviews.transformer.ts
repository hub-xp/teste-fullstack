import { Injectable } from '@nestjs/common';
import { Review } from '../reviews.entity';

@Injectable()
export class ReviewTransformer {
  async transform(review: Review) {
    return {
      id: review._id,
      bookId: review.bookId,
      reviewCount: review.reviewCount,
      avaliation: review.avaliation,
      createdAt: review.createdAt,
    };
  }

  async transformMany(reviews: Review[]) {
    return await Promise.all(
      reviews.map(async (review) => await this.transform(review)),
    );
  }
}
