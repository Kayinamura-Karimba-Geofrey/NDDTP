import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationTemplate } from '../../database/entities/notification-template.entity';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { TemplateRepository } from './repositories/template.repository';
import { DeliveryModule } from '../delivery/delivery.module';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationTemplate]), DeliveryModule],
  controllers: [TemplateController],
  providers: [TemplateService, TemplateRepository],
  exports: [TemplateService, TemplateRepository],
})
export class TemplateModule {}
