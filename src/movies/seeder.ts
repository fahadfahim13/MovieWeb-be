import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { seeder } from 'nestjs-seeder';
import { Movie, MovieSchema } from './movies.schema';
import { MovieSeeder } from './movies.seeder';

seeder({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
}).run([MovieSeeder]);
