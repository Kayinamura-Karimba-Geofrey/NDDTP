import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformanceCycle } from '../../database/entities/performance-cycle.entity';
import { CycleController } from './cycle.controller';
import { CycleService } from './cycle.service';
import { CycleRepository } from './repositories/cycle.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([PerformanceCycle]), EventsModule],
  controllers: [CycleController],
  providers: [CycleService, CycleRepository],
  exports: [CycleRepository],
})
export class CycleModule {}
