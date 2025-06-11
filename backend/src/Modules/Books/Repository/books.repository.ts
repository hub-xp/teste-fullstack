import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../Entity/book.entity';
import { Model } from 'mongoose';
import { CreateBookDTO } from '../Dtos/create-book.dto';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectModel(Book.name)
    private readonly bookRepository: Model<Book>,
  ) {}

  public async create(payload: CreateBookDTO) {
    const book = await this.bookRepository.create(payload);
    return book;
  }

  public async list() {
    const books = await this.bookRepository.find();
    return books;
  }

  public async findById(id: string) {
    const book = await this.bookRepository.findById(id);
    return book;
  }

  public async update(id: string, payload: CreateBookDTO) {
    const book = await this.bookRepository.findByIdAndUpdate(id, payload, { new: true });
    return book;
  }

  public async destroy(id: string) {
    await this.bookRepository.findByIdAndDelete(id);
  }

}
