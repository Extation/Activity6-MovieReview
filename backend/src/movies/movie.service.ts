import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto, UpdateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create({
      ...createMovieDto,
      averageRating: 0,
    });
    return this.movieRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find({
      relations: ['reviews'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Movie | null> {
    return this.movieRepository.findOne({
      where: { id },
      relations: ['reviews'],
    });
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie | null> {
    await this.movieRepository.update(id, updateMovieDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.movieRepository.delete(id);
  }

  async updateAverageRating(movieId: string): Promise<void> {
    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
      relations: ['reviews'],
    });

    if (movie && movie.reviews.length > 0) {
      const average =
        movie.reviews.reduce((sum, review) => sum + review.rating, 0) /
        movie.reviews.length;
      await this.movieRepository.update(movieId, {
        averageRating: parseFloat(average.toFixed(1)),
      });
    }
  }
}
