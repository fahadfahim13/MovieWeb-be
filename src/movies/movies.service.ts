import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument } from './movies.schema';
import { Movie as MovieEntity } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  _getMovieDetails(movie: MovieDocument): MovieEntity {
    return {
      id: movie._id,
      title: movie.title,
      description: movie.description,
      year: movie.year,
      image: movie.image,
    };
  }

  async find(options) {
    return this.movieModel.find(options).exec();
  }

  async count(options) {
    return this.movieModel.count(options).exec();
  }

  async search(
    value: string,
    page: number,
    limit: number,
  ): Promise<{ data: MovieEntity[]; options: any }> {
    let options = {};
    if (value) {
      options = {
        $or: [
          { title: new RegExp(value, 'i') },
          // { description: new RegExp(value, 'i') },
        ],
      };
    }
    const movies = await this.movieModel
      .find(options)
      .skip((page - 1) * limit)
      .limit(limit);
    const result = movies.map((m) => this._getMovieDetails(m));
    return { data: result, options };
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = new this.movieModel(createMovieDto);
    await movie.save();
    return this._getMovieDetails(movie);
  }

  async findAll(): Promise<MovieEntity[]> {
    const movies = await this.movieModel.find().exec();
    return movies.map((mov) => this._getMovieDetails(mov));
  }

  async findOne(id: string): Promise<MovieEntity> {
    const movie = await this.movieModel.findById(id).exec();
    return this._getMovieDetails(movie);
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<MovieEntity> {
    const movie = await this.movieModel
      .findByIdAndUpdate(id, updateMovieDto)
      .exec();
    return this._getMovieDetails(movie);
  }

  async remove(id: string) {
    return this.movieModel.findByIdAndDelete(id);
  }
}
