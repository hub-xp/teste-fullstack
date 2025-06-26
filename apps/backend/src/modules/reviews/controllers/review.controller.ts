import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { CreateReviewDto } from '../views/create-review.dto';
import { UpdateReviewDto } from '../views/update-review.dto';

@Controller('books/:bookId/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Param('bookId') bookId: string, @Body() dto: CreateReviewDto) {
    return this.reviewService.create({ ...dto, book: bookId });
  }

  @Get()
  findByBook(@Param('bookId') bookId: string) {
    return this.reviewService.findByBookId(bookId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReviewDto) {
    return this.reviewService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }
}
