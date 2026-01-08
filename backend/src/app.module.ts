import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MovieModule } from './movies/movie.module';
import { ReviewModule } from './reviews/review.module';
import { Movie } from './movies/movie.entity';
import { Review } from './reviews/review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'movie-review.db',
      entities: [Movie, Review],
      synchronize: true,
      logging: true,
    }),
    MovieModule,
    ReviewModule,
  ],
})
export class AppModule {
  static setupSwagger(app: any) {
    const config = new DocumentBuilder()
      .setTitle('Movie Review API')
      .setDescription('API for managing movies and their reviews with ratings')
      .setVersion('1.0')
      .addTag('movies', 'Movie management endpoints')
      .addTag('reviews', 'Review management endpoints')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }
}
