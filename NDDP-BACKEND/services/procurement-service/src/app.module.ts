import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { VendorModule } from './modules/vendors/vendor.module';
import { RequisitionModule } from './modules/requisitions/requisition.module';
import { OrderModule } from './modules/orders/order.module';
import { ReceiptModule } from './modules/receipts/receipt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-procurement-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    VendorModule,
    RequisitionModule,
    OrderModule,
    ReceiptModule,
  ],
})
export class AppModule {}
