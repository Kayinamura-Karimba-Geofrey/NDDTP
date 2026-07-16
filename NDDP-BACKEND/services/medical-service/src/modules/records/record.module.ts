import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecord } from '../../database/entities/medical-record.entity';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { RecordRepository } from './repositories/record.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalRecord]), EventsModule],
  controllers: [RecordController],
  providers: [RecordService, RecordRepository],
})
export class RecordModule {}
