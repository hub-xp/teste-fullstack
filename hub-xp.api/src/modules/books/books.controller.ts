import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BookService } from './books.service';
import { CreateBookDto, createReviewCountDto } from './dtos/create-books.dto';
import { QueryParamsDTO } from './dtos/query-params.dto';
import { UpdateBookDto } from './dtos/update-books.dto';

@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createBookDto: CreateBookDto,
  ) {
    const data = await this.bookService.createBook(createBookDto);
    res.status(HttpStatus.CREATED).json({ data });
  }

  @Get()
  async findAllBooks(
    @Req() req: Request,
    @Res() res: Response,
    @Query() queryParams: QueryParamsDTO,
  ) {
    const data = await this.bookService.findAllBooks(queryParams);
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  async findOneBook(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    const data = await this.bookService.findOneBook(id);
    res.status(HttpStatus.OK).json({ data });
  }

  @Put(':id')
  async updateBook(
    @Req() req: Request,
    @Res() res: Response,
    @Body() updateBookDto: UpdateBookDto,
    @Param('id') id: string,
  ) {
    const data = await this.bookService.updateBook(id, updateBookDto);
    res.status(HttpStatus.OK).json({ data });
  }

  @Delete(':id')
  async deleteBook(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    await this.bookService.deleteBook(id);
    res.status(HttpStatus.OK).json({ message: 'Livro deletado com sucesso' });
  }
}
