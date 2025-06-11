import { Injectable } from "@nestjs/common";
import { BooksRepository } from "../Repository/books.repository";
import { CreateBookDTO } from "../Dtos/create-book.dto";

@Injectable()
export class UpdateBookService {
    constructor(
        private booksRepository: BooksRepository
    ) {}

    async handle(id: string, payload: CreateBookDTO): Promise<any> {
        const data = await this.booksRepository.update(id, payload);

        return data;
    }
}