import { Injectable } from "@nestjs/common";
import { BooksRepository } from "../Repository/books.repository";
import { ReviewsRepository } from "../../Reviews/Repository/reviews.repository";

@Injectable()
export class GetTopRatedBookService {
    constructor(
        private reviewsRepository: ReviewsRepository,
        private booksRepository: BooksRepository
    ) {}

    async handle(limit: string): Promise<any> {
        const data = await this.reviewsRepository.findTopRatedBooks(limit);
        
        const normalizeData = await Promise.all(data.map(async (item) => {
            const book = await this.booksRepository.findById(item.bookId);
            
            return {
                reviewCount: item?.reviewCount || 0,
                avgRating: item?.avgRating || 0,
                bookId: item?.bookId,
                name: book?.name,
                reviews: item?.reviews
            }
        }));

        return normalizeData;
    }
}