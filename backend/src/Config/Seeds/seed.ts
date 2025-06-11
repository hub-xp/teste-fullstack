import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../../Modules/Books/Entity/book.entity';
import { Review } from '../../Modules/Reviews/Entity/review.entity';
import { CreateReviewDTO } from '../../Modules/Reviews/Dtos/create-review.dto';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(Review.name) private reviewModel: Model<Review>,
  ) {}

  async seed() {
    // Clear existing data
    await this.bookModel.deleteMany({});
    await this.reviewModel.deleteMany({});

    // Create books
    const books = await this.bookModel.create([
      { name: 'Harry Potter' },
      { name: 'The Hobbit' },
    ]);

    // Create reviews for each book
    const reviews: CreateReviewDTO[] = [];
    const userNames = ['Diego', 'João', 'Maria', 'Ana', 'Pedro'];
    const ratings = [4, 5, 3, 4, 5];

    for (const book of books) {
      for (let i = 0; i < 5; i++) {
        reviews.push({
          bookId: String(book._id),
          userName: userNames[i],
          rating: ratings[i],
        });
      }
    }

    await this.reviewModel.create(reviews);

    console.log('Seed completed successfully!');
  }
} 