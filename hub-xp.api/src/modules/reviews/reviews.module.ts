import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './reviews.entity';
import { ReviewTransformer } from './transformer/reviews.transformer';
import { ReviewController } from './reviews.controller';
import { ReviewRepository } from './reviews.repository';
import { ReviewService } from './reviews.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  ],
  controllers: [ReviewController],
  providers: [ReviewRepository, ReviewService, ReviewTransformer],
})
export class ReviewModule {}
