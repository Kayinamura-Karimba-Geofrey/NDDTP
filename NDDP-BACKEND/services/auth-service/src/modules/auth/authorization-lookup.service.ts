import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface EffectiveAuthz {
  roles: string[];
  permissions: string[];
}

@Injectable()
export class AuthorizationLookupService {
  private readonly logger = new Logger(AuthorizationLookupService.name);

  constructor(private readonly configService: ConfigService) {}

  async getEffectivePermissions(userId: string): Promise<EffectiveAuthz> {
    const baseUrl =
      this.configService.get<string>('authorization.serviceUrl') ||
      process.env.AUTHORIZATION_SERVICE_URL ||
      'http://127.0.0.1:3002/api/v1';
    const serviceKey =
      this.configService.get<string>('authorization.internalServiceKey') ||
      process.env.INTERNAL_SERVICE_KEY ||
      'change_me_internal_service_key';

    const url = `${baseUrl.replace(/\/$/, '')}/internal/users/${userId}/effective-permissions`;

    try {
      const response = await fetch(url, {
        headers: {
          'x-internal-service-key': serviceKey,
          'X-Correlation-Id': `auth-login-${userId}`,
        },
      });

      if (!response.ok) {
        this.logger.warn(`Authorization lookup failed (${response.status}) for user ${userId}`);
        return { roles: [], permissions: [] };
      }

      const body = (await response.json()) as {
        roles?: string[];
        permissions?: string[];
        data?: { roles?: string[]; permissions?: string[] };
      };

      const payload = body.data ?? body;
      return {
        roles: payload.roles ?? [],
        permissions: payload.permissions ?? [],
      };
    } catch (error) {
      this.logger.warn(
        `Authorization lookup error for user ${userId}: ${error instanceof Error ? error.message : error}`,
      );
      return { roles: [], permissions: [] };
    }
  }
}
