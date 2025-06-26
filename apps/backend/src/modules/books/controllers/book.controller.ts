import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { BookService } from '../services/book.service';
import { CreateBookDto } from '../views/create-book.dto';
import { UpdateBookDto } from '../views/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get('top')
  getTopRated(@Query('limit') limit?: string) {
    const parsedLimit = Number(limit) || 10;
    return this.bookService.getTopRated(parsedLimit);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.bookService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.bookService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookService.delete(id);
  }
}
