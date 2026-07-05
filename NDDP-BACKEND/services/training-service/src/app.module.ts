import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule, PlatformHealthModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { CourseModule } from './modules/courses/course.module';
import { SessionModule } from './modules/sessions/session.module';
import { EnrollmentModule } from './modules/enrollments/enrollment.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { CertificationModule } from './modules/certifications/certification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-training-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    CourseModule,
    SessionModule,
    EnrollmentModule,
    AttendanceModule,
    CertificationModule,
    PlatformHealthModule,
  ],
})
export class AppModule {}
