import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../../database/entities/message.entity';
import { MessageReceipt } from '../../../database/entities/message-receipt.entity';
import { MessageStatus } from '../../../common/enums';
import { PaginatedResult } from '@nddtp/platform-core';

@Injectable()
export class MessageRepository {
  constructor(@InjectRepository(Message) private readonly repo: Repository<Message>) {}

  create(data: Partial<Message>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['channel', 'receipts'] }); }
  update(id: string, data: Partial<Message>) { return this.repo.update(id, data as Record<string, unknown>); }

  async findByChannel(channelId: string, page: number, limit: number): Promise<PaginatedResult<Message>> {
    const [data, total] = await this.repo.findAndCount({
      where: { channelId, status: MessageStatus.SENT as MessageStatus },
      relations: ['receipts'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  async findByChannelAllStatuses(channelId: string, page: number, limit: number): Promise<PaginatedResult<Message>> {
    const qb = this.repo.createQueryBuilder('m')
      .leftJoinAndSelect('m.receipts', 'receipts')
      .where('m.channelId = :channelId', { channelId })
      .andWhere('m.status != :deleted', { deleted: MessageStatus.DELETED });
    const total = await qb.getCount();
    const data = await qb.orderBy('m.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getMany();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

@Injectable()
export class MessageReceiptRepository {
  constructor(@InjectRepository(MessageReceipt) private readonly repo: Repository<MessageReceipt>) {}

  create(data: Partial<MessageReceipt>) { return this.repo.save(this.repo.create(data)); }
  findByMessageAndRecipient(messageId: string, recipientId: string) {
    return this.repo.findOne({ where: { messageId, recipientId } });
  }
  update(id: string, data: Partial<MessageReceipt>) { return this.repo.update(id, data as Record<string, unknown>); }
}
