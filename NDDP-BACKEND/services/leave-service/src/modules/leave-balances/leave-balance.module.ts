import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveBalance } from '../../database/entities';
import { LeaveBalanceController } from './leave-balance.controller';
import { LeaveBalanceService } from './leave-balance.service';
import { LeaveBalanceRepository } from './repositories/leave-balance.repository';
import { LeaveTypeModule } from '../leave-types/leave-type.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveBalance]), LeaveTypeModule, EventsModule],
  controllers: [LeaveBalanceController],
  providers: [LeaveBalanceService, LeaveBalanceRepository],
  exports: [LeaveBalanceService, LeaveBalanceRepository],
})
export class LeaveBalanceModule {}
