import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsController } from "./reviews.controller";
import { CreateReviewService } from "./Services/create-review.service";
import { ReviewsRepository } from "./Repository/reviews.repository";
import { Review, ReviewSchema } from "./Entity/review.entity";
import { DeleteReviewService } from "./Services/delete-review.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }])],
    controllers: [ReviewsController],
    providers: [CreateReviewService, ReviewsRepository, DeleteReviewService],
})

export class ReviewsModule {}