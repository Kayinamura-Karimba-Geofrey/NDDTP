import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WelfareClaim, ClaimStatusHistory, Disbursement } from '../../database/entities';
import { ClaimController } from './claim.controller';
import { ClaimService } from './claim.service';
import { ClaimRepository, ClaimStatusHistoryRepository, DisbursementRepository } from './repositories/claim.repository';
import { ProgramModule } from '../programs/program.module';
import { DependentModule } from '../dependents/dependent.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WelfareClaim, ClaimStatusHistory, Disbursement]),
    ProgramModule,
    DependentModule,
    EventsModule,
  ],
  controllers: [ClaimController],
  providers: [ClaimService, ClaimRepository, ClaimStatusHistoryRepository, DisbursementRepository],
})
export class ClaimModule {}
