import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ReviewService } from './reviews.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { QueryParamsDTO } from './dtos/query-params.dto';

@Controller('/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    const result = await this.reviewService.create(createReviewDto);
    res.status(HttpStatus.CREATED).json(result);
  }

  @Get()
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Query() queryParams: QueryParamsDTO,
  ) {
    const result = await this.reviewService.findAll(queryParams);
    res.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    const result = await this.reviewService.findOne(id);
    res.status(HttpStatus.OK).json(result);
  }

  @Get('book/:bookId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findByBookId(
    @Req() req: Request,
    @Res() res: Response,
    @Param('bookId') bookId: string,
    @Query() queryParams: QueryParamsDTO,
  ) {
    const result = await this.reviewService.findByBookId(bookId, queryParams);
    res.status(HttpStatus.OK).json(result);
  }

  @Patch(':id')
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const result = await this.reviewService.update(id, updateReviewDto);
    res.status(HttpStatus.OK).json(result);
  }

  @Delete(':id')
  async remove(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    const result = await this.reviewService.remove(id);
    res.status(HttpStatus.OK).json(result);
  }
} 