import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiAgent } from '../../database/entities/ai-agent.entity';
import { AgentRepository } from './repositories/agent.repository';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([AiAgent]), RedisModule, EventsModule],
  controllers: [AgentController],
  providers: [AgentRepository, AgentService],
  exports: [AgentRepository, AgentService],
})
export class AgentModule {}
