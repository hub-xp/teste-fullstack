import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Book } from '../books/books.entity';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  bookId: Types.ObjectId;

  @Prop({ required: true })
  reviewCount: number;

  @Prop({ required: true })
  avaliation: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'books' })
  book: Book;
}

export const ReviewSchema = SchemaFactory.createForClass(Review); 