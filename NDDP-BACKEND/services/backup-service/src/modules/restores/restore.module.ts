import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackupRestore } from '../../database/entities/backup-restore.entity';
import { RestoreRepository } from './repositories/restore.repository';
import { RestoreService } from './restore.service';
import { RestoreController } from './restore.controller';
import { JobModule } from '../jobs/job.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([BackupRestore]), JobModule, EventsModule],
  controllers: [RestoreController],
  providers: [RestoreRepository, RestoreService],
})
export class RestoreModule {}
