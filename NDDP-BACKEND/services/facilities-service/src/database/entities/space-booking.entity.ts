import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { BookingStatus } from '../../common/enums';
import { FacilitySpace } from './facility-space.entity';

@Entity('space_bookings')
@Index('idx_space_bookings_number', ['bookingNumber'], { unique: true })
export class SpaceBooking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'booking_number', type: 'varchar', length: 50, unique: true })
  bookingNumber: string;

  @Column({ name: 'space_id', type: 'uuid' })
  spaceId: string;

  @Column({ name: 'booked_by', type: 'uuid' })
  bookedBy: string;

  @Column({ name: 'purpose', type: 'varchar', length: 300 })
  purpose: string;

  @Column({ name: 'start_time', type: 'timestamptz' })
  startTime: Date;

  @Column({ name: 'end_time', type: 'timestamptz' })
  endTime: Date;

  @Column({ type: 'int', default: 1 })
  attendees: number;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
  status: BookingStatus;

  @Column({ name: 'reviewer_id', type: 'uuid', nullable: true })
  reviewerId: string | null;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => FacilitySpace)
  @JoinColumn({ name: 'space_id' })
  space: FacilitySpace;
}
