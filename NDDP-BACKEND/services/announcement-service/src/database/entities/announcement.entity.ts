import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AnnouncementPriority, AnnouncementStatus, AudienceType } from '../../common/enums';
import { AnnouncementCategory } from './announcement-category.entity';
import { AnnouncementAcknowledgement } from './announcement-acknowledgement.entity';

@Entity('announcements')
@Index('idx_announcements_status', ['status'])
@Index('idx_announcements_reference', ['referenceNumber'], { unique: true })
export class Announcement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'reference_number', type: 'varchar', length: 50, unique: true })
  referenceNumber: string;

  @Column({ name: 'category_id', type: 'uuid' })
  categoryId: string;

  @ManyToOne(() => AnnouncementCategory, (c) => c.announcements)
  @JoinColumn({ name: 'category_id' })
  category: AnnouncementCategory;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: AnnouncementPriority, default: AnnouncementPriority.NORMAL })
  priority: AnnouncementPriority;

  @Column({ type: 'enum', enum: AnnouncementStatus, default: AnnouncementStatus.DRAFT })
  status: AnnouncementStatus;

  @Column({ name: 'audience_type', type: 'enum', enum: AudienceType, default: AudienceType.ALL })
  audienceType: AudienceType;

  @Column({ name: 'audience_ref', type: 'varchar', length: 100, nullable: true })
  audienceRef: string | null;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @Column({ name: 'published_by', type: 'uuid', nullable: true })
  publishedBy: string | null;

  @Column({ name: 'published_at', type: 'timestamptz', nullable: true })
  publishedAt: Date | null;

  @Column({ name: 'expires_at', type: 'timestamptz', nullable: true })
  expiresAt: Date | null;

  @OneToMany(() => AnnouncementAcknowledgement, (a) => a.announcement)
  acknowledgements: AnnouncementAcknowledgement[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
