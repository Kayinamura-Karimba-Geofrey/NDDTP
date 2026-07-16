import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageChannel } from '../../../database/entities/message-channel.entity';
import { ChannelMember } from '../../../database/entities/channel-member.entity';
import { ChannelStatus } from '../../../common/enums';

@Injectable()
export class MessageChannelRepository {
  constructor(@InjectRepository(MessageChannel) private readonly repo: Repository<MessageChannel>) {}

  create(data: Partial<MessageChannel>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['members'] }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  update(id: string, data: Partial<MessageChannel>) { return this.repo.update(id, data as Record<string, unknown>); }
}

@Injectable()
export class ChannelMemberRepository {
  constructor(@InjectRepository(ChannelMember) private readonly repo: Repository<ChannelMember>) {}

  create(data: Partial<ChannelMember>) { return this.repo.save(this.repo.create(data)); }
  findByChannelAndUser(channelId: string, userId: string) { return this.repo.findOne({ where: { channelId, userId } }); }
  countByChannel(channelId: string) { return this.repo.count({ where: { channelId } }); }

  findChannelsByUser(userId: string) {
    return this.repo.find({
      where: { userId },
      relations: ['channel'],
      order: { joinedAt: 'DESC' },
    });
  }
}
