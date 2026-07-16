import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiConversation } from '../../../database/entities/ai-conversation.entity';
import { ConversationStatus } from '../../../common/enums';

@Injectable()
export class ConversationRepository {
  constructor(@InjectRepository(AiConversation) private readonly repo: Repository<AiConversation>) {}

  create(data: Partial<AiConversation>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<AiConversation>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['agent', 'messages'] });
  }

  findByUser(userId: string) {
    return this.repo.find({
      where: { userId, status: ConversationStatus.ACTIVE },
      relations: ['agent'],
      order: { updatedAt: 'DESC' },
    });
  }
}
