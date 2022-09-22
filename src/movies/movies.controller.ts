import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @UseGuards(JwtGuard)
  @Post('search')
  async search(
    @Body() body: { value?: string; page?: number; limit?: number },
  ) {
    const { value = '', page = 1, limit = 10 } = body;
    const { data, options } = await this.moviesService.search(
      value,
      page,
      limit,
    );
    const total = await this.moviesService.count(options);
    const last_page = Math.ceil(total / limit);
    return {
      data,
      total,
      page,
      last_page,
    };
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
