import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  bookId: string;

  @Prop({ required: true })
  userName: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
