import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitSite } from '../../database/entities/visit-site.entity';
import { VisitSiteController } from './visit-site.controller';
import { VisitSiteService } from './visit-site.service';
import { VisitSiteRepository } from './repositories/visit-site.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([VisitSite]), EventsModule],
  controllers: [VisitSiteController],
  providers: [VisitSiteService, VisitSiteRepository],
  exports: [VisitSiteRepository, VisitSiteService],
})
export class VisitSiteModule {}
