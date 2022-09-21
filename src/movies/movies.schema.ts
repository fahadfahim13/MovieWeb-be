import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomInt } from 'crypto';
import { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Factory((faker) => faker.lorem.words(4))
  @Prop({ required: true })
  title: string;

  @Factory((faker) => faker.lorem.words(100))
  @Prop({ required: false, default: '' })
  description: string;

  @Factory((faker) => randomInt(1990, 2025).toString())
  @Prop({ required: false, default: '' })
  year: string;

  @Factory((faker) => faker.image.imageUrl())
  @Prop({ required: false, default: '' })
  image: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
