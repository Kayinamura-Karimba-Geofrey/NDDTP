import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { WinstonModule } from 'nest-winston';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { PermissionsGuard } from './auth/permissions.guard';
import { JwtStrategy } from './auth/jwt.strategy';
import { createWinstonConfig } from './config/winston.config';
import { GlobalExceptionFilter } from './observability/global-exception.filter';
import { CorrelationIdInterceptor } from './observability/correlation-id.interceptor';

export interface PlatformModuleOptions {
  serviceName: string;
}

@Module({})
export class PlatformModule {
  static forRoot(options: PlatformModuleOptions): DynamicModule {
    return {
      module: PlatformModule,
      imports: [
        WinstonModule.forRoot(createWinstonConfig(options.serviceName)),
        ThrottlerModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => [{
            ttl: configService.get<number>('security.rateLimitTtl') || 60,
            limit: configService.get<number>('security.rateLimitLimit') || 200,
          }],
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('jwt.accessSecret'),
          }),
        }),
      ],
      providers: [
        JwtStrategy,
        { provide: APP_FILTER, useClass: GlobalExceptionFilter },
        { provide: APP_INTERCEPTOR, useClass: CorrelationIdInterceptor },
        { provide: APP_GUARD, useClass: ThrottlerGuard },
        { provide: APP_GUARD, useClass: JwtAuthGuard },
        { provide: APP_GUARD, useClass: PermissionsGuard },
      ],
      exports: [JwtModule, PassportModule],
    };
  }
}
