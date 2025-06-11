import { Injectable } from "@nestjs/common";
import { BooksRepository } from "../Repository/books.repository";
import { CreateBookDTO } from "../Dtos/create-book.dto";

@Injectable()
export class CreateBookService {
    constructor(
        private booksRepository: BooksRepository
    ) {}

    async handle(payload: CreateBookDTO): Promise<any> {
        const data = await this.booksRepository.create(payload);

        return data;
    }
}