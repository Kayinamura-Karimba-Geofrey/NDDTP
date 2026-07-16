import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rank, RankHistory } from '../../database/entities';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';
import { RankRepository, RankHistoryRepository } from './repositories/rank.repository';
import { PersonnelModule } from '../personnel/personnel.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rank, RankHistory]), PersonnelModule, EventsModule],
  controllers: [RankController],
  providers: [RankService, RankRepository, RankHistoryRepository],
})
export class RankModule {}
