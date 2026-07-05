import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../common/interfaces';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...p: string[]) => SetMetadata(PERMISSIONS_KEY, p);

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest<RequestWithUser>().user;
});
