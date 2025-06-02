import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './review.schema';
import { CreateReviewDto } from './create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() data: CreateReviewDto) {
    return this.reviewsService.create({
      ...data,
      book: data.book as any,
    });
  }

  @Get('book/:bookId')
  findAllByBook(@Param('bookId') bookId: string) {
    return this.reviewsService.findAllByBook(bookId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Review>) {
    return this.reviewsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
