import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveType } from '../../database/entities';
import { LeaveTypeController } from './leave-type.controller';
import { LeaveTypeService } from './leave-type.service';
import { LeaveTypeRepository } from './repositories/leave-type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveType])],
  controllers: [LeaveTypeController],
  providers: [LeaveTypeService, LeaveTypeRepository],
  exports: [LeaveTypeService, LeaveTypeRepository],
})
export class LeaveTypeModule {}
