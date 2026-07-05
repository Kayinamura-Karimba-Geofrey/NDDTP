import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { ReviewStatus, RatingLevel } from '../../common/enums';
import { PerformanceCycle } from './performance-cycle.entity';
import { ReviewRating } from './review-rating.entity';

@Entity('performance_reviews')
@Index('idx_performance_reviews_user', ['userId'])
@Index('idx_performance_reviews_cycle', ['cycleId'])
@Index('idx_performance_reviews_status', ['status'])
export class PerformanceReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'review_number', type: 'varchar', length: 50, unique: true })
  reviewNumber: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'cycle_id', type: 'uuid' })
  cycleId: string;

  @Column({ name: 'reviewer_id', type: 'uuid', nullable: true })
  reviewerId: string | null;

  @Column({ type: 'enum', enum: ReviewStatus, default: ReviewStatus.DRAFT })
  status: ReviewStatus;

  @Column({ name: 'self_assessment', type: 'text', nullable: true })
  selfAssessment: string | null;

  @Column({ name: 'manager_comments', type: 'text', nullable: true })
  managerComments: string | null;

  @Column({ name: 'overall_rating', type: 'enum', enum: RatingLevel, nullable: true })
  overallRating: RatingLevel | null;

  @Column({ name: 'submitted_at', type: 'timestamptz', nullable: true })
  submittedAt: Date | null;

  @Column({ name: 'finalized_at', type: 'timestamptz', nullable: true })
  finalizedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => PerformanceCycle, (c) => c.reviews)
  @JoinColumn({ name: 'cycle_id' })
  cycle: PerformanceCycle;

  @OneToMany(() => ReviewRating, (r) => r.review)
  ratings: ReviewRating[];
}
