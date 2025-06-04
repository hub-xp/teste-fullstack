import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModule } from './app.module';
import { Book } from './books/schemas/book.schema';
import { Review } from './reviews/schemas/review.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const bookModel = app.get<Model<Book>>(getModelToken(Book.name));
  const reviewModel = app.get<Model<Review>>(getModelToken(Review.name));

  await bookModel.deleteMany();
  await reviewModel.deleteMany();

  const books = await bookModel.insertMany([
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    },
    {
      title: '1984',
      author: 'George Orwell',
      description:
        'A dystopian novel set in a totalitarian society under surveillance',
    },
    {
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      description: 'Explores the two systems that drive the way we think',
    },
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      description: 'A Handbook of Agile Software Craftsmanship',
    },
    {
      title: 'Start With Why',
      author: 'Simon Sinek',
      description: 'How Great Leaders Inspire Everyone to Take Action',
    },
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A classic novel set in the Jazz Age of 1920s America',
    },
    {
      title: 'The Lean Startup',
      author: 'Eric Ries',
      description: 'How Today’s Entrepreneurs Use Continuous Innovation',
    },
    {
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      description: 'Timeless lessons on wealth, greed, and happiness',
    },
    {
      title: 'Brave New World',
      author: 'Aldous Huxley',
      description:
        'A vision of a future society driven by pleasure and control',
    },
    {
      title: 'You Don’t Know JS',
      author: 'Kyle Simpson',
      description: 'Deep Dive into JavaScript for advanced developers',
    },
  ]);

  const reviews = [
    {
      reviewer: 'Alice',
      rating: 5,
      comment: 'Changed the way I build habits!',
      bookId: books[0]._id,
    },
    {
      reviewer: 'Lucas',
      rating: 4,
      comment: 'A masterpiece of dystopian fiction.',
      bookId: books[1]._id,
    },
    {
      reviewer: 'Roberta',
      rating: 5,
      comment: 'Super insightful on how we think.',
      bookId: books[2]._id,
    },
    {
      reviewer: 'Fernando',
      rating: 5,
      comment: 'Must-read for developers.',
      bookId: books[3]._id,
    },
    {
      reviewer: 'Carlos',
      rating: 4,
      comment: 'Great for understanding startup mentality.',
      bookId: books[6]._id,
    },
  ];

  await reviewModel.insertMany(reviews);

  console.log(
    `✅ Seed completed: ${books.length} books and ${reviews.length} reviews added.`,
  );

  await app.close();
}

bootstrap();
