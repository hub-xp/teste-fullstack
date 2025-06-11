import { Injectable } from "@nestjs/common";
import { ReviewsRepository } from "../Repository/reviews.repository";

@Injectable()
export class DeleteReviewService {
    constructor(
        private reviewsRepository: ReviewsRepository
    ) {}

    async handle(id: string): Promise<any> {
        const data = await this.reviewsRepository.destroy(id);

        return data;
    }
}