import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitRequest } from '../../database/entities/visit-request.entity';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';
import { VisitRepository } from './repositories/visit.repository';
import { VisitorModule } from '../visitors/visitor.module';
import { VisitSiteModule } from '../sites/visit-site.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([VisitRequest]), VisitorModule, VisitSiteModule, EventsModule],
  controllers: [VisitController],
  providers: [VisitService, VisitRepository],
  exports: [VisitRepository, VisitService],
})
export class VisitModule {}
