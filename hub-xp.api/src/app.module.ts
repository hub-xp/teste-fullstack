import { Module } from '@nestjs/common';
import { BookModule } from './modules/books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { ReviewModule } from './modules/reviews/reviews.module';
dotenv.config();
const { env } = process;

@Module({
  imports: [
    MongooseModule.forRoot(env.MONGO_URI as string),
    BookModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
