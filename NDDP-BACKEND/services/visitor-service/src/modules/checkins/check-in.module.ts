import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckInLog } from '../../database/entities/check-in-log.entity';
import { CheckInController } from './check-in.controller';
import { CheckInService } from './check-in.service';
import { CheckInRepository } from './repositories/check-in.repository';
import { VisitModule } from '../visits/visit.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([CheckInLog]), VisitModule, EventsModule],
  controllers: [CheckInController],
  providers: [CheckInService, CheckInRepository],
  exports: [CheckInRepository, CheckInService],
})
export class CheckInModule {}
