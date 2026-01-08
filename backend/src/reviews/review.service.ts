import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { MovieService } from '../movies/movie.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private movieService: MovieService,
  ) {}

  async create(movieId: string, createReviewDto: CreateReviewDto): Promise<Review> {
    const review = this.reviewRepository.create({
      ...createReviewDto,
      movieId,
    });
    const savedReview = await this.reviewRepository.save(review);
    await this.movieService.updateAverageRating(movieId);
    return savedReview;
  }

  async findByMovie(movieId: string): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { movieId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Review | null> {
    return this.reviewRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    const review = await this.findOne(id);
    await this.reviewRepository.delete(id);
    if (review) {
      await this.movieService.updateAverageRating(review.movieId);
    }
  }
}
