import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ConversationStatus } from '../../common/enums';
import { AiAgent } from './ai-agent.entity';
import { AiMessage } from './ai-message.entity';

@Entity('ai_conversations')
@Index('idx_ai_conversations_number', ['conversationNumber'], { unique: true })
export class AiConversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'conversation_number', type: 'varchar', length: 50, unique: true })
  conversationNumber: string;

  @Column({ name: 'agent_id', type: 'uuid' })
  agentId: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  title: string | null;

  @Column({ type: 'enum', enum: ConversationStatus, default: ConversationStatus.ACTIVE })
  status: ConversationStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => AiAgent, (a) => a.conversations)
  @JoinColumn({ name: 'agent_id' })
  agent: AiAgent;

  @OneToMany(() => AiMessage, (m) => m.conversation)
  messages: AiMessage[];
}
