import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './auth.decorators';
import { RequestWithUser } from '../interfaces';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const raw = this.reflector.getAllAndOverride<string[] | string>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const required = !raw ? [] : Array.isArray(raw) ? raw : [raw];
    if (!required.length) return true;

    const user = context.switchToHttp().getRequest<RequestWithUser>().user;
    if (user?.roles?.includes('SUPER_ADMIN')) return true;
    if (user?.permissions?.includes('*')) return true;

    const hasAll = required.every((permission) => user?.permissions?.includes(permission));
    if (!hasAll) {
      throw new ForbiddenException('Insufficient permissions');
    }
    return true;
  }
}
