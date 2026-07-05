import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackupPolicy } from '../../database/entities/backup-policy.entity';
import { PolicyRepository } from './repositories/policy.repository';
import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([BackupPolicy]), RedisModule, EventsModule],
  controllers: [PolicyController],
  providers: [PolicyRepository, PolicyService],
  exports: [PolicyRepository, PolicyService],
})
export class PolicyModule {}
