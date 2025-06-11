import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './Entity/book.entity';
import { BooksController } from "./books.controller";
import { ListBooksService } from "./Services/list-books.service";
import { CreateBookService } from "./Services/create-book.service";
import { BooksRepository } from "./Repository/books.repository";
import { UpdateBookService } from "./Services/update-book.service";
import { DeleteBookService } from "./Services/delete-book.service";
import { GetBookReviewsService } from "./Services/get-book-reviews.service";
import { ReviewsRepository } from "../Reviews/Repository/reviews.repository";
import { Review, ReviewSchema } from "../Reviews/Entity/review.entity";
import { GetTopRatedBookService } from "./Services/get-top-rated-books.service";
import { DeleteReviewService } from "../Reviews/Services/delete-review.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Book.name, schema: BookSchema },
            { name: Review.name, schema: ReviewSchema }
        ])
    ],
    controllers: [BooksController],
    providers: [ListBooksService, CreateBookService, BooksRepository, UpdateBookService, DeleteBookService, GetBookReviewsService, ReviewsRepository, GetTopRatedBookService, DeleteReviewService],
})

export class BooksModule {}