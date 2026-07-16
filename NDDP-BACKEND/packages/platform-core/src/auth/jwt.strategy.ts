import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedUser } from '../interfaces';

function jwtSetting(configService: ConfigService, key: string, envKey: string, fallback: string): string {
  return configService.get<string>(key) || process.env[envKey] || fallback;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSetting(
        configService,
        'jwt.accessSecret',
        'JWT_ACCESS_SECRET',
        'change_me_access_secret_min_32_chars_long',
      ),
      issuer: jwtSetting(configService, 'jwt.issuer', 'JWT_ISSUER', 'nddtp-auth-service'),
      audience: jwtSetting(configService, 'jwt.audience', 'JWT_AUDIENCE', 'nddtp-platform'),
    });
  }

  validate(payload: Record<string, unknown>): AuthenticatedUser {
    return {
      sub: payload.sub as string,
      email: payload.email as string,
      sessionId: payload.sessionId as string,
      roles: (payload.roles as string[]) || [],
      permissions: (payload.permissions as string[]) || [],
    };
  }
}
