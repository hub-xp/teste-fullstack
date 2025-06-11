import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { CreateReviewService } from "./Services/create-review.service";
import { CreateReviewDTO } from "./Dtos/create-review.dto";
import { DeleteReviewService } from "./Services/delete-review.service";

@Controller('reviews')
export class ReviewsController {
    constructor(
        private readonly createReviewService: CreateReviewService,
        private readonly deleteReviewService: DeleteReviewService
    ) {}

    @Post()
    public async createReview(@Body() body: CreateReviewDTO): Promise<any> {
      const review = await this.createReviewService.handle(body);
      return review;
    }

    @Delete(':id')
    public async deleteReview(@Param('id') id: string): Promise<any> {
      const review = await this.deleteReviewService.handle(id);
      return review;
    }

}