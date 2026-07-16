import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog, SecurityEvent, RetentionPolicy } from '../../database/entities';
import { AuditLogController } from './audit-log.controller';
import { SecurityEventController } from './security-event.controller';
import { AuditLogService } from './audit-log.service';
import { SecurityEventService } from './security-event.service';
import { IntegrityService } from './integrity.service';
import { EventMapperService } from './event-mapper.service';
import { RetentionService } from './retention.service';
import { AuditLogRepository } from './repositories/audit-log.repository';
import { SecurityEventRepository } from './repositories/security-event.repository';
import { RetentionPolicyRepository } from './repositories/retention-policy.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditLog, SecurityEvent, RetentionPolicy]),
    forwardRef(() => EventsModule),
  ],
  controllers: [AuditLogController, SecurityEventController],
  providers: [
    AuditLogService,
    SecurityEventService,
    IntegrityService,
    EventMapperService,
    RetentionService,
    AuditLogRepository,
    SecurityEventRepository,
    RetentionPolicyRepository,
  ],
  exports: [AuditLogService, SecurityEventService, EventMapperService],
})
export class AuditModule {}
