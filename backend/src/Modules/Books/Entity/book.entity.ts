import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Review, ReviewSchema } from '../../Reviews/Entity/review.entity';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [ReviewSchema], default: [] })
  reviews: Review[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
