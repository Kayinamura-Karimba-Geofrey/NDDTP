import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { RsvpStatus } from '../../common/enums';
import { CalendarEvent } from './calendar-event.entity';

@Entity('event_attendees')
@Index('idx_event_attendees_event_user', ['eventId', 'userId'], { unique: true })
export class EventAttendee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'event_id', type: 'uuid' })
  eventId: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ type: 'enum', enum: RsvpStatus, default: RsvpStatus.PENDING })
  rsvpStatus: RsvpStatus;

  @Column({ name: 'invited_by', type: 'uuid' })
  invitedBy: string;

  @Column({ name: 'responded_at', type: 'timestamptz', nullable: true })
  respondedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => CalendarEvent)
  @JoinColumn({ name: 'event_id' })
  event: CalendarEvent;
}
