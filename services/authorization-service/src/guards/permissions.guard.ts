import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/auth.decorators';
import { RequestWithUser } from '../common/interfaces';
import { AuthorizationEngineService } from '../modules/authorization/authorization-engine.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authzEngine: AuthorizationEngineService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!required?.length) return true;

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const userId = request.user?.sub;
    if (!userId) throw new ForbiddenException('Authentication required');

    for (const permission of required) {
      const result = await this.authzEngine.checkPermission(userId, permission);
      if (!result.allowed) {
        throw new ForbiddenException(`Required permission: ${permission}`);
      }
    }
    return true;
  }
}
