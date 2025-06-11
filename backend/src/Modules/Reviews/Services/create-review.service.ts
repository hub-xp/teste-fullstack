import { Injectable } from "@nestjs/common";
import { CreateReviewDTO } from "../Dtos/create-review.dto";
import { ReviewsRepository } from "../Repository/reviews.repository";

@Injectable()
export class CreateReviewService {
    constructor(
        private reviewsRepository: ReviewsRepository
    ) {}

    async handle(payload: CreateReviewDTO): Promise<any> {
        const data = await this.reviewsRepository.create(payload);

        return data;
    }
}