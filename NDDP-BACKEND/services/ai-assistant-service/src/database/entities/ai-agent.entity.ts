import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { AgentType, AgentStatus } from '../../common/enums';
import { AiConversation } from './ai-conversation.entity';

@Entity('ai_agents')
@Index('idx_ai_agents_code', ['code'], { unique: true })
export class AiAgent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'agent_type', type: 'enum', enum: AgentType })
  agentType: AgentType;

  @Column({ name: 'model_name', type: 'varchar', length: 100, default: 'gpt-4' })
  modelName: string;

  @Column({ name: 'system_prompt', type: 'text' })
  systemPrompt: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: AgentStatus, default: AgentStatus.ACTIVE })
  status: AgentStatus;

  @OneToMany(() => AiConversation, (c) => c.agent)
  conversations: AiConversation[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
