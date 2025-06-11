import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ListBooksService } from "./Services/list-books.service";
import { CreateBookDTO } from "./Dtos/create-book.dto";
import { CreateBookService } from "./Services/create-book.service";
import { UpdateBookService } from "./Services/update-book.service";
import { DeleteBookService } from "./Services/delete-book.service";
import { GetBookReviewsService } from "./Services/get-book-reviews.service";
import { GetTopRatedBookService } from "./Services/get-top-rated-books.service";

@Controller('books')
export class BooksController {
    constructor(
        private readonly listBooksService: ListBooksService,
        private readonly createBookService: CreateBookService,
        private readonly updateBookService: UpdateBookService,
        private readonly deleteBookService: DeleteBookService,
        private readonly getBookReviewsService: GetBookReviewsService,
        private readonly getTopRatedBooksService: GetTopRatedBookService
    ) {}

    @Post()
    public async createBook(@Body() body: CreateBookDTO): Promise<any> {
      const book = await this.createBookService.handle(body);
      return book;
    }

    @Get()
    public async listBooks(): Promise<any> {
      const books = await this.listBooksService.handle();
      return books;
    }

    @Get('top')
    public async getTopRatedBooks(@Query('limit') limit: string): Promise<any> {
      const books = await this.getTopRatedBooksService.handle(limit || '10');
      return books;
    }

    @Put(':id')
    public async updateBook(@Param('id') id: string, @Body() body: CreateBookDTO): Promise<any> {
      const book = await this.updateBookService.handle(id, body);
      return book;
    }

    @Delete(':id')
    public async deleteBook(@Param('id') id: string): Promise<any> {
      const book = await this.deleteBookService.handle(id);
      return book;
    }

    @Get(':id/reviews')
    public async getBookReviews(@Param('id') id: string): Promise<any> {
      const reviews = await this.getBookReviewsService.handle(id);
      return reviews;
    }
}