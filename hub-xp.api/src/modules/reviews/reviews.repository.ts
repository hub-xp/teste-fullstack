import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './reviews.entity';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { QueryParamsDTO } from './dtos/query-params.dto';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectModel(Review.name)
    private reviewModel: Model<ReviewDocument>,
  ) {}

  private todasPropsSaoUndefined(obj) {
    return Object.values(obj).every((value) => value === undefined);
  }

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = new this.reviewModel(createReviewDto);
    return review.save();
  }

  async findAll(
    { page, limit: limitParam, reviewCount, avaliation }: QueryParamsDTO,
    skip: number,
    limit: number,
  ): Promise<{ reviews: Review[]; total: number }> {
    const query: any = {};

    if (reviewCount !== undefined && !isNaN(Number(reviewCount))) {
      query.reviewCount = { $gte: Number(reviewCount) };
    }

    if (avaliation) {
      query.avaliation = avaliation;
    }

    const [reviews, total] = await Promise.all([
      this.reviewModel
        .find(query)
        .populate('bookId')
        .skip(skip)
        .limit(limit)
        .exec(),
      this.reviewModel.countDocuments(query).exec(),
    ]);

    return { reviews, total };
  }

  async findOne(id: string): Promise<Review | null> {
    return this.reviewModel.findById(id).populate('bookId').exec();
  }

  async findByBookId(
    bookId: string,
    skip: number,
    limit: number,
  ): Promise<{ reviews: Review[]; total: number }> {
    const [reviews, total] = await Promise.all([
      this.reviewModel.find({ bookId }).skip(skip).limit(limit).exec(),
      this.reviewModel.countDocuments({ bookId }),
    ]);
    return { reviews, total };
  }

  async update(
    id: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review | null> {
    return this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Review | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }
}
