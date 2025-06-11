import { Injectable } from "@nestjs/common";
import { BooksRepository } from "../Repository/books.repository";

@Injectable()
export class ListBooksService {
    constructor(
        private booksRepository: BooksRepository
    ) {}

    async handle(): Promise<any> {
        const data = await this.booksRepository.list();

        return data;
    }
}