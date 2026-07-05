import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { Announcement } from './announcement.entity';

@Entity('announcement_acknowledgements')
@Index('idx_announcement_ack_announcement_user', ['announcementId', 'userId'], { unique: true })
export class AnnouncementAcknowledgement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'announcement_id', type: 'uuid' })
  announcementId: string;

  @ManyToOne(() => Announcement, (a) => a.acknowledgements)
  @JoinColumn({ name: 'announcement_id' })
  announcement: Announcement;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'acknowledged_at', type: 'timestamptz' })
  acknowledgedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
