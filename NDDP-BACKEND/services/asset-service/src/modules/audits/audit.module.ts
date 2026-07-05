import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetAudit } from '../../database/entities/asset-audit.entity';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { AuditRepository } from './repositories/audit.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([AssetAudit]), EventsModule],
  controllers: [AuditController],
  providers: [AuditService, AuditRepository],
})
export class AuditModule {}
