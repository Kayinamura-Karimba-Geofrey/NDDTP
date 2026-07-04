import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { WinstonModule } from 'nest-winston';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { configuration } from './config';
import { winstonConfig } from './config/winston.config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { JobPostingModule } from './modules/job-postings/job-posting.module';
import { ApplicationModule } from './modules/applications/application.module';
import { InterviewModule } from './modules/interviews/interview.module';
import { EventsModule } from './events/events.module';
import { HealthModule } from './modules/health/health.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { CorrelationIdInterceptor } from './interceptors/correlation-id.interceptor';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    WinstonModule.forRoot(winstonConfig),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => [{ ttl: cs.get<number>('security.rateLimitTtl') || 60, limit: cs.get<number>('security.rateLimitLimit') || 200 }],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({ secret: cs.get<string>('jwt.accessSecret') }),
    }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    JobPostingModule,
    ApplicationModule,
    InterviewModule,
    HealthModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: CorrelationIdInterceptor },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PermissionsGuard },
    JwtStrategy,
  ],
})
export class AppModule {}
