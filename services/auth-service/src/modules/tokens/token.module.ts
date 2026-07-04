import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { RefreshToken } from '../../database/entities/refresh-token.entity';
import { PasswordModule } from '../password/password.module';
import { SessionModule } from '../sessions/session.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.accessSecret'),
      }),
    }),
    PasswordModule,
    SessionModule,
    EventsModule,
  ],
  providers: [TokenService, RefreshTokenRepository],
  exports: [TokenService, RefreshTokenRepository],
})
export class TokenModule {}
