import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { ChannelType, ChannelStatus } from '../../common/enums';
import { ChannelMember } from './channel-member.entity';
import { Message } from './message.entity';

@Entity('message_channels')
@Index('idx_message_channels_code', ['code'], { unique: true })
export class MessageChannel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'channel_type', type: 'enum', enum: ChannelType })
  channelType: ChannelType;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @Column({ type: 'enum', enum: ChannelStatus, default: ChannelStatus.ACTIVE })
  status: ChannelStatus;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @OneToMany(() => ChannelMember, (m) => m.channel)
  members: ChannelMember[];

  @OneToMany(() => Message, (m) => m.channel)
  messages: Message[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
