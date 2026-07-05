import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { ReceiptStatus } from '../../common/enums';
import { Message } from './message.entity';

@Entity('message_receipts')
@Index('idx_message_receipts_message_recipient', ['messageId', 'recipientId'], { unique: true })
export class MessageReceipt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'message_id', type: 'uuid' })
  messageId: string;

  @ManyToOne(() => Message, (m) => m.receipts)
  @JoinColumn({ name: 'message_id' })
  message: Message;

  @Column({ name: 'recipient_id', type: 'uuid' })
  recipientId: string;

  @Column({ type: 'enum', enum: ReceiptStatus })
  status: ReceiptStatus;

  @Column({ name: 'acknowledged_at', type: 'timestamptz' })
  acknowledgedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
