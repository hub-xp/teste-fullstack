import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ValidationPipe,
  UsePipes,
  NotFoundException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';
import { Review } from '../reviews/review.schema';
import { ReviewsService } from '../reviews/reviews.service';
import { CreateReviewDto } from '../reviews/create-review.dto';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Post()
  create(@Body() data: Partial<Book>) {
    return this.booksService.create(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (id === 'top') {
      throw new NotFoundException();
    }
    const book = await this.booksService.findOne(id);
    const result = await this.reviewsService.findAllByBook(id);
    return { ...book.toObject(), ...result };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Book>) {
    return this.booksService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }

  @Post(':bookId/reviews')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async addReview(
    @Param('bookId') bookId: string,
    @Body() review: CreateReviewDto,
  ) {
    return this.reviewsService.create({
      ...review,
      book: bookId as any,
      reviewer: 'Joãozinho',
    });
  }

  @Get(':id/reviews')
  async getReviewsByBook(@Param('id') id: string) {
    return this.reviewsService.findAllByBook(id);
  }

  @Get()
  async findAll() {
    const books = await this.booksService.findAll();
    const result = await Promise.all(
      books.map(async (book) => {
        const reviewsResult = await this.reviewsService.findAllByBook(
          (book._id as any).toString(),
        );
        return { ...book.toObject(), ...reviewsResult };
      }),
    );
    result.sort((a, b) => {
      if (b.avgRating !== a.avgRating) return b.avgRating - a.avgRating;
      return (b.reviews?.length || 0) - (a.reviews?.length || 0);
    });
    return result;
  }
}
