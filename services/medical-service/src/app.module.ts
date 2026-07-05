import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule, PlatformHealthModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { FacilityModule } from './modules/facilities/facility.module';
import { AppointmentModule } from './modules/appointments/appointment.module';
import { RecordModule } from './modules/records/record.module';
import { FitnessModule } from './modules/fitness/fitness.module';
import { CertificateModule } from './modules/certificates/certificate.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-medical-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    FacilityModule,
    AppointmentModule,
    RecordModule,
    FitnessModule,
    CertificateModule,
    PlatformHealthModule,
  ],
})
export class AppModule {}
