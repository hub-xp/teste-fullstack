import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(data: Partial<Book>): Promise<Book> {
    return this.bookModel.create(data);
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: string, data: Partial<Book>): Promise<Book> {
    const book = await this.bookModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async remove(id: string): Promise<void> {
    const res = await this.bookModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Book not found');
  }
}
