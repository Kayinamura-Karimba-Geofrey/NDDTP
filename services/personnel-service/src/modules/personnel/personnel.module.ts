import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonnelRecord, ServiceHistory } from '../../database/entities';
import { PersonnelController } from './personnel.controller';
import { PersonnelService } from './personnel.service';
import { PersonnelRecordRepository } from './repositories/personnel-record.repository';
import { ServiceHistoryRepository } from './repositories/service-history.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonnelRecord, ServiceHistory]),
    forwardRef(() => EventsModule),
  ],
  controllers: [PersonnelController],
  providers: [PersonnelService, PersonnelRecordRepository, ServiceHistoryRepository],
  exports: [PersonnelService, PersonnelRecordRepository, ServiceHistoryRepository],
})
export class PersonnelModule {}
