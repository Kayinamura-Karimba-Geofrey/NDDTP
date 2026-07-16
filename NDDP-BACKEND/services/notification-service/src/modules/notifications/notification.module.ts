import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification, NotificationDelivery } from '../../database/entities';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './repositories/notification.repository';
import { DeliveryRepository } from './repositories/delivery.repository';
import { TemplateModule } from '../templates/template.module';
import { DeliveryModule } from '../delivery/delivery.module';
import { PreferenceModule } from '../preferences/preference.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, NotificationDelivery]),
    TemplateModule,
    DeliveryModule,
    PreferenceModule,
    forwardRef(() => EventsModule),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository, DeliveryRepository],
  exports: [NotificationService],
})
export class NotificationModule {}
