import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { MemberRole } from '../../common/enums';
import { MessageChannel } from './message-channel.entity';

@Entity('channel_members')
@Index('idx_channel_members_channel_user', ['channelId', 'userId'], { unique: true })
export class ChannelMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'channel_id', type: 'uuid' })
  channelId: string;

  @ManyToOne(() => MessageChannel, (c) => c.members)
  @JoinColumn({ name: 'channel_id' })
  channel: MessageChannel;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ type: 'enum', enum: MemberRole, default: MemberRole.MEMBER })
  role: MemberRole;

  @CreateDateColumn({ name: 'joined_at', type: 'timestamptz' })
  joinedAt: Date;
}
