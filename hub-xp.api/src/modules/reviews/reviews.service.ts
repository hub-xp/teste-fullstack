import { HttpStatus, Injectable } from '@nestjs/common';
import { ReviewRepository } from './reviews.repository';
import { ReviewTransformer } from './transformer/reviews.transformer';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { AppError } from '../../commons/AppError';
import { OperationErrors } from 'src/commons/OperationErrors.enum';
import { QueryParamsDTO } from './dtos/query-params.dto';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly reviewTransformer: ReviewTransformer,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const review = await this.reviewRepository.create(createReviewDto);
    return {
      data: await this.reviewTransformer.transform(review),
      message: 'Review criada com sucesso',
    };
  }

  async findAll({ page = 1, limit = 10, ...queryParams }: QueryParamsDTO) {
    const { reviews, total } = await this.reviewRepository.findAll(
      { page, limit, ...queryParams },
      (page - 1) * limit,
      limit,
    );

    const transformedReviews = await this.reviewTransformer.transformMany(reviews);

    return {
      data: transformedReviews,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const review = await this.reviewRepository.findOne(id);
    if (!review) {
      throw new AppError(
        OperationErrors.NOT_FOUND,
        HttpStatus.NOT_FOUND,
        'Review não encontrada',
        true,
      );
    }
    return {
      data: await this.reviewTransformer.transform(review),
    };
  }

  async findByBookId(bookId: string, { page = 1, limit = 10 }: QueryParamsDTO) {
    const { reviews, total } = await this.reviewRepository.findByBookId(
      bookId,
      (page - 1) * limit,
      limit,
    );

    const transformedReviews = await this.reviewTransformer.transformMany(reviews);

    return {
      data: transformedReviews,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.update(id, updateReviewDto);
    if (!review) {
      throw new AppError(
        OperationErrors.NOT_FOUND,
        HttpStatus.NOT_FOUND,
        'Review não encontrada para atualização',
        true,
      );
    }
    return {
      data: await this.reviewTransformer.transform(review),
      message: 'Review atualizada com sucesso',
    };
  }

  async remove(id: string) {
    const review = await this.reviewRepository.remove(id);
    if (!review) {
      throw new AppError(
        OperationErrors.NOT_FOUND,
        HttpStatus.NOT_FOUND,
        'Review não encontrada para exclusão',
        true,
      );
    }
    return {
      data: await this.reviewTransformer.transform(review),
      message: 'Review removida com sucesso',
    };
  }
}
