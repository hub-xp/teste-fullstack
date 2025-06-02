import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from './books/book.schema';
import { Review } from './reviews/review.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const bookModel = app.get(getModelToken(Book.name));
  const reviewModel = app.get(getModelToken(Review.name));

  await bookModel.deleteMany({});
  await reviewModel.deleteMany({});

  const books = await bookModel.insertMany([
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      description: 'A Handbook of Agile Software Craftsmanship.',
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      description: 'Your Journey to Mastery.',
    },
    {
      title: 'Design Patterns',
      author: 'Erich Gamma',
      description: 'Elements of Reusable Object-Oriented Software.',
    },
  ]);

  await reviewModel.insertMany([
    {
      book: books[0]._id,
      reviewer: 'Alice',
      rating: 5,
      comment: 'Excelente livro!',
    },
    {
      book: books[0]._id,
      reviewer: 'Bob',
      rating: 4,
      comment: 'Muito bom, recomendo.',
    },
    {
      book: books[1]._id,
      reviewer: 'Carol',
      rating: 5,
      comment: 'Indispensável para devs.',
    },
    {
      book: books[2]._id,
      reviewer: 'Dave',
      rating: 3,
      comment: 'Bom, mas denso.',
    },
  ]);

  console.log('Seed concluído!');
  await app.close();
}

bootstrap();
