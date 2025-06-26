import { Book } from '../../modules/books/models/book.schema';

export const booksSeedData: Partial<Book>[] = [
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    description: 'A Handbook of Agile Software Craftsmanship',
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'Andy Hunt',
    description: 'Your Journey to Mastery',
  },
  {
    title: 'Refactoring',
    author: 'Martin Fowler',
    description: 'Improving the Design of Existing Code',
  },
];
