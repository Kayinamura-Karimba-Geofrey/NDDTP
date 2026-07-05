import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageChannel } from '../../database/entities/message-channel.entity';
import { ChannelMember } from '../../database/entities/channel-member.entity';
import { MessageChannelRepository, ChannelMemberRepository } from './repositories/channel.repository';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageChannel, ChannelMember]),
    RedisModule,
    EventsModule,
  ],
  controllers: [ChannelController],
  providers: [MessageChannelRepository, ChannelMemberRepository, ChannelService],
  exports: [MessageChannelRepository, ChannelMemberRepository, ChannelService],
})
export class ChannelModule {}
