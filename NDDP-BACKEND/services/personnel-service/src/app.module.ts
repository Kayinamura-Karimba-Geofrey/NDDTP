import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { PersonnelModule } from './modules/personnel/personnel.module';
import { RankModule } from './modules/ranks/rank.module';
import { UnitModule } from './modules/units/unit.module';
import { AssignmentModule } from './modules/assignments/assignment.module';
import { QualificationModule } from './modules/qualifications/qualification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-personnel-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    PersonnelModule,
    RankModule,
    UnitModule,
    AssignmentModule,
    QualificationModule,
  ],
})
export class AppModule {}
