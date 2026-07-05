import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiMessage } from '../../../database/entities/ai-message.entity';

@Injectable()
export class MessageRepository {
  constructor(@InjectRepository(AiMessage) private readonly repo: Repository<AiMessage>) {}

  create(data: Partial<AiMessage>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<AiMessage>) { return this.repo.update(id, data as Record<string, unknown>); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['conversation'] }); }

  findByConversation(conversationId: string) {
    return this.repo.find({ where: { conversationId }, order: { createdAt: 'ASC' } });
  }
}
