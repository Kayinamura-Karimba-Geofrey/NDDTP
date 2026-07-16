import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn,
} from 'typeorm';
import { RatingLevel } from '../../common/enums';
import { PerformanceReview } from './performance-review.entity';
import { RatingCriteria } from './rating-criteria.entity';

@Entity('review_ratings')
@Index('idx_review_ratings_review', ['reviewId'])
export class ReviewRating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'review_id', type: 'uuid' })
  reviewId: string;

  @Column({ name: 'criteria_id', type: 'uuid' })
  criteriaId: string;

  @Column({ type: 'enum', enum: RatingLevel })
  rating: RatingLevel;

  @Column({ type: 'text', nullable: true })
  comments: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => PerformanceReview, (r) => r.ratings)
  @JoinColumn({ name: 'review_id' })
  review: PerformanceReview;

  @ManyToOne(() => RatingCriteria)
  @JoinColumn({ name: 'criteria_id' })
  criteria: RatingCriteria;
}
