import { Module, forwardRef } from '@nestjs/common';
import { TemplateRendererService } from './template-renderer.service';
import { EmailProviderService } from './email-provider.service';
import { DeliveryEngineService } from './delivery-engine.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification, NotificationDelivery } from '../../database/entities';
import { NotificationRepository } from '../notifications/repositories/notification.repository';
import { DeliveryRepository } from '../notifications/repositories/delivery.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, NotificationDelivery]),
    forwardRef(() => EventsModule),
  ],
  providers: [
    TemplateRendererService,
    EmailProviderService,
    DeliveryEngineService,
    NotificationRepository,
    DeliveryRepository,
  ],
  exports: [TemplateRendererService, EmailProviderService, DeliveryEngineService],
})
export class DeliveryModule {}
