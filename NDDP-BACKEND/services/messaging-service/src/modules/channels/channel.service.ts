import { Injectable, Logger } from '@nestjs/common';
import { MessageChannelRepository, ChannelMemberRepository } from './repositories/channel.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateChannelDto, AddChannelMemberDto } from './dto/channel.dto';
import {
  DuplicateResourceException, ResourceNotFoundException,
  BusinessRuleViolationException, ForbiddenChannelAccessException,
} from '../../common/exceptions/messaging.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { ChannelType, ChannelStatus, MemberRole } from '../../common/enums';

@Injectable()
export class ChannelService {
  private readonly logger = new Logger(ChannelService.name);

  constructor(
    private readonly channelRepo: MessageChannelRepository,
    private readonly memberRepo: ChannelMemberRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(createdBy: string, dto: CreateChannelDto) {
    const existing = await this.channelRepo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    if (dto.channelType === ChannelType.DIRECT) {
      const members = dto.memberIds ?? [];
      if (members.length !== 1) {
        throw new BusinessRuleViolationException('DIRECT channels require exactly one other member');
      }
    }

    const channel = await this.channelRepo.create({
      code: dto.code,
      name: dto.name,
      channelType: dto.channelType,
      createdBy,
      description: dto.description ?? null,
      status: ChannelStatus.ACTIVE,
    });

    await this.memberRepo.create({ channelId: channel.id, userId: createdBy, role: MemberRole.OWNER });

    if (dto.memberIds?.length) {
      for (const userId of dto.memberIds) {
        if (userId !== createdBy) {
          await this.memberRepo.create({ channelId: channel.id, userId, role: MemberRole.MEMBER });
          await this.publisher.publishMemberAdded({ channelId: channel.id, userId });
        }
      }
    }

    await this.redis.del(CACHE_KEYS.USER_CHANNELS(createdBy));
    await this.publisher.publishChannelCreated({ channelId: channel.id, code: channel.code, createdBy });
    this.logger.log(`Channel created: ${channel.code}`);
    return this.channelRepo.findById(channel.id);
  }

  async findMine(userId: string) {
    const cached = await this.redis.get(CACHE_KEYS.USER_CHANNELS(userId));
    if (cached) return JSON.parse(cached);
    const memberships = await this.memberRepo.findChannelsByUser(userId);
    const channels = memberships.map((m) => m.channel).filter((c) => c.status === ChannelStatus.ACTIVE);
    await this.redis.set(CACHE_KEYS.USER_CHANNELS(userId), JSON.stringify(channels), 300);
    return channels;
  }

  async findById(id: string, userId: string) {
    await this.assertMembership(id, userId);
    const channel = await this.channelRepo.findById(id);
    if (!channel) throw new ResourceNotFoundException('MessageChannel', id);
    return channel;
  }

  async addMember(channelId: string, requesterId: string, dto: AddChannelMemberDto) {
    const channel = await this.channelRepo.findById(channelId);
    if (!channel) throw new ResourceNotFoundException('MessageChannel', channelId);
    if (channel.status !== ChannelStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Cannot add members to an archived channel');
    }

    const requester = await this.memberRepo.findByChannelAndUser(channelId, requesterId);
    if (!requester || (requester.role !== MemberRole.OWNER && requester.role !== MemberRole.ADMIN)) {
      throw new ForbiddenChannelAccessException();
    }

    if (channel.channelType === ChannelType.DIRECT) {
      throw new BusinessRuleViolationException('Cannot add members to a DIRECT channel');
    }

    const existing = await this.memberRepo.findByChannelAndUser(channelId, dto.userId);
    if (existing) throw new DuplicateResourceException('userId', dto.userId);

    const member = await this.memberRepo.create({
      channelId,
      userId: dto.userId,
      role: dto.role ?? MemberRole.MEMBER,
    });

    await this.redis.del(CACHE_KEYS.USER_CHANNELS(dto.userId));
    await this.publisher.publishMemberAdded({ channelId, userId: dto.userId });
    return member;
  }

  async archive(channelId: string, userId: string) {
    const channel = await this.channelRepo.findById(channelId);
    if (!channel) throw new ResourceNotFoundException('MessageChannel', channelId);
    if (channel.createdBy !== userId) {
      throw new BusinessRuleViolationException('Only the channel owner can archive it');
    }
    await this.channelRepo.update(channelId, { status: ChannelStatus.ARCHIVED });
    await this.redis.del(CACHE_KEYS.CHANNEL(channelId));
    return this.channelRepo.findById(channelId);
  }

  async assertMembership(channelId: string, userId: string) {
    const member = await this.memberRepo.findByChannelAndUser(channelId, userId);
    if (!member) throw new ForbiddenChannelAccessException();
    return member;
  }
}
