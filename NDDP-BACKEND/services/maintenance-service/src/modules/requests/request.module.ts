import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceRequest } from '../../database/entities/maintenance-request.entity';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { RequestRepository } from './repositories/request.repository';
import { CategoryModule } from '../categories/category.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([MaintenanceRequest]), CategoryModule, EventsModule],
  controllers: [RequestController],
  providers: [RequestService, RequestRepository],
  exports: [RequestRepository, RequestService],
})
export class RequestModule {}
