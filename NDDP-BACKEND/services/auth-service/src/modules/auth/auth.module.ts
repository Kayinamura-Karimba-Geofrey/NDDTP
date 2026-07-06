import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCredential } from '../../database/entities/auth-credential.entity';
import { LoginAttempt } from '../../database/entities/login-attempt.entity';
import { AuthCredentialRepository } from '../credentials/repositories/auth-credential.repository';
import { LoginAttemptRepository } from './repositories/login-attempt.repository';
import { PasswordModule } from '../password/password.module';
import { TokenModule } from '../tokens/token.module';
import { MfaModule } from '../mfa/mfa.module';
import { SessionModule } from '../sessions/session.module';
import { EventsModule } from '../../events/events.module';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { LocalStrategy } from '../../strategies/local.strategy';
import { PasswordResetToken } from '../../database/entities/password-reset-token.entity';
import { PasswordResetTokenRepository } from '../password/repositories/password-reset-token.repository';
import { AuthorizationLookupService } from './authorization-lookup.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthCredential, LoginAttempt, PasswordResetToken]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.accessSecret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.accessExpiresIn'),
          issuer: configService.get<string>('jwt.issuer'),
          audience: configService.get<string>('jwt.audience'),
        },
      }),
    }),
    PasswordModule,
    TokenModule,
    MfaModule,
    SessionModule,
    EventsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthCredentialRepository,
    LoginAttemptRepository,
    PasswordResetTokenRepository,
    AuthorizationLookupService,
    JwtStrategy,
    LocalStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
