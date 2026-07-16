import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { Announcement } from './announcement.entity';

@Entity('announcement_audiences')
@Index('idx_announcement_audiences_announcement', ['announcementId'])
export class AnnouncementAudience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'announcement_id', type: 'uuid' })
  announcementId: string;

  @ManyToOne(() => Announcement)
  @JoinColumn({ name: 'announcement_id' })
  announcement: Announcement;

  @Column({ name: 'audience_type', type: 'varchar', length: 50 })
  audienceType: string;

  @Column({ name: 'audience_ref', type: 'varchar', length: 100 })
  audienceRef: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
