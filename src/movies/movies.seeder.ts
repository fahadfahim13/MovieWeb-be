import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Movie, MovieDocument } from './movies.schema';

export class MovieSeeder implements Seeder {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
  ) {}

  drop(): Promise<any> {
    return this.movieModel.deleteMany({}) as any;
  }

  seed(): Promise<any> {
    const movies = DataFactory.createForClass(Movie).generate(50);
    return this.movieModel.insertMany(movies);
  }
}
