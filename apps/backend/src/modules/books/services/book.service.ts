import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../models/book.schema';
import { CreateBookDto } from '../views/create-book.dto';
import { UpdateBookDto } from '../views/update-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  create(dto: CreateBookDto) {
    return this.bookModel.create(dto);
  }

  findAll() {
    return this.bookModel.find().exec();
  }

  findById(id: string) {
    return this.bookModel.findById(id).exec();
  }

  update(id: string, dto: UpdateBookDto) {
    return this.bookModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  delete(id: string) {
    return this.bookModel.findByIdAndDelete(id).exec();
  }

  async getTopRated(limit: number = 10) {
    const parsedLimit = Number(limit);

    return this.bookModel.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'book',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          reviewCount: { $size: '$reviews' },
          avgRating: {
            $cond: [
              { $gt: [{ $size: '$reviews' }, 0] },
              {
                $avg: {
                  $map: {
                    input: '$reviews',
                    as: 'review',
                    in: { $toDouble: '$$review.rating' }, // Garante tipo número
                  },
                },
              },
              null,
            ],
          },
        },
      },
      { $sort: { avgRating: -1 } },
      { $limit: parsedLimit },
    ]);
  }
}
