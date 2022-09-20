import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false, default: '' })
  description: string;

  @Prop({ required: false, default: '' })
  year: string;

  @Prop({ required: false, default: '' })
  image: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
