import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveRequest, LeaveApproval, LeaveStatusHistory } from '../../database/entities';
import { LeaveRequestController } from './leave-request.controller';
import { LeaveRequestService } from './leave-request.service';
import {
  LeaveRequestRepository, LeaveApprovalRepository, LeaveStatusHistoryRepository,
} from './repositories/leave-request.repository';
import { LeaveTypeModule } from '../leave-types/leave-type.module';
import { LeaveBalanceModule } from '../leave-balances/leave-balance.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LeaveRequest, LeaveApproval, LeaveStatusHistory]),
    LeaveTypeModule,
    LeaveBalanceModule,
    EventsModule,
  ],
  controllers: [LeaveRequestController],
  providers: [
    LeaveRequestService,
    LeaveRequestRepository,
    LeaveApprovalRepository,
    LeaveStatusHistoryRepository,
  ],
})
export class LeaveRequestModule {}
