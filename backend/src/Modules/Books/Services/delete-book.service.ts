import { Injectable } from "@nestjs/common";
import { BooksRepository } from "../Repository/books.repository";

@Injectable()
export class DeleteBookService {
    constructor(
        private booksRepository: BooksRepository
    ) {}

    async handle(id: string): Promise<void> {
        await this.booksRepository.destroy(id);
    }
}