import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  book: Types.ObjectId;

  @Prop({ required: true })
  reviewer: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ default: '' })
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
