import { Injectable } from "@nestjs/common";
import { BooksRepository } from "../Repository/books.repository";
import { ReviewsRepository } from "../../Reviews/Repository/reviews.repository";

@Injectable()
export class GetBookReviewsService {
    constructor(
        private reviewsRepository: ReviewsRepository,
        private booksRepository: BooksRepository
    ) {}

    async handle(id: string): Promise<any> {
        const book = await this.booksRepository.findById(id);
        const reviews = await this.reviewsRepository.findByBookId(id);

        const normalizeData = {
            book: book?.name,
            reviews: reviews
        }

        return normalizeData;
    }
}