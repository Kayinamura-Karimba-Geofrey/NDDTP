import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { WarehouseModule } from './modules/warehouses/warehouse.module';
import { ItemModule } from './modules/items/item.module';
import { StockModule } from './modules/stock/stock.module';
import { RequestModule } from './modules/requests/request.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-inventory-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    WarehouseModule,
    ItemModule,
    StockModule,
    RequestModule,
  ],
})
export class AppModule {}
