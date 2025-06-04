import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookModel.create(createBookDto);
  }

  async findAll(limit = 10): Promise<Book[]> {
    return this.bookModel.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'bookId',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          reviewsCount: { $size: '$reviews' },
          avgRating: {
            $cond: [
              { $gt: [{ $size: '$reviews' }, 0] },
              { $avg: '$reviews.rating' },
              0,
            ],
          },
        },
      },
      {
        $project: {
          reviews: 0,
        },
      },
      {
        $sort: { avgRating: -1 },
      },
      {
        $limit: limit,
      },
    ]);
  }

  async findOne(id: string): Promise<any> {
    return this.bookModel
      .aggregate([
        {
          $match: { _id: new Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'bookId',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviewsCount: { $size: '$reviews' },
            avgRating: {
              $cond: [
                { $gt: [{ $size: '$reviews' }, 0] },
                { $avg: '$reviews.rating' },
                0,
              ],
            },
          },
        },
        {
          $project: {
            reviews: 0,
          },
        },
      ])
      .then((result) => result[0] || null);
  }
}
