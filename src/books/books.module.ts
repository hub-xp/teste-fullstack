import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book, BookSchema } from './book.schema';
import { Review, ReviewSchema } from '../reviews/review.schema';
import { ReviewsService } from '../reviews/reviews.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService, ReviewsService],
  exports: [MongooseModule],
})
export class BooksModule {}
