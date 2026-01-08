import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post(':movieId')
  @ApiOperation({ summary: 'Create a review for a movie' })
  @ApiResponse({ status: 201, description: 'Review created', type: Review })
  create(
    @Param('movieId') movieId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewService.create(movieId, createReviewDto);
  }

  @Get('movie/:movieId')
  @ApiOperation({ summary: 'Get all reviews for a movie' })
  @ApiResponse({ status: 200, description: 'List of reviews', type: [Review] })
  findByMovie(@Param('movieId') movieId: string) {
    return this.reviewService.findByMovie(movieId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get review by ID' })
  @ApiResponse({ status: 200, description: 'Review details', type: Review })
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review' })
  @ApiResponse({ status: 200, description: 'Review deleted' })
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
