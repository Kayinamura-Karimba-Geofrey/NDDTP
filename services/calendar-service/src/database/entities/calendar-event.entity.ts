import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { CalendarEventType, EventStatus } from '../../common/enums';
import { Calendar } from './calendar.entity';

@Entity('calendar_events')
@Index('idx_calendar_events_number', ['eventNumber'], { unique: true })
export class CalendarEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'event_number', type: 'varchar', length: 50, unique: true })
  eventNumber: string;

  @Column({ name: 'calendar_id', type: 'uuid' })
  calendarId: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'event_type', type: 'enum', enum: CalendarEventType, default: CalendarEventType.MEETING })
  eventType: CalendarEventType;

  @Column({ name: 'start_time', type: 'timestamptz' })
  startTime: Date;

  @Column({ name: 'end_time', type: 'timestamptz' })
  endTime: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  location: string | null;

  @Column({ type: 'enum', enum: EventStatus, default: EventStatus.DRAFT })
  status: EventStatus;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => Calendar)
  @JoinColumn({ name: 'calendar_id' })
  calendar: Calendar;
}
