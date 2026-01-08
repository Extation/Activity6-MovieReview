import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from '../reviews/review.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  director: string;

  @Column({ type: 'int' })
  releaseYear: number;

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0 })
  averageRating: number;

  @OneToMany(() => Review, (review) => review.movie, { cascade: true })
  reviews: Review[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
