import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '@nddtp/platform-core';

export const CurrentUser = createParamDecorator(
  (data: keyof RequestWithUser['user'] | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return data ? request.user?.[data] : request.user;
  },
);

export const CorrelationId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.correlationId || (request.headers['x-correlation-id'] as string) || '';
  },
);

export const ClientIp = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<RequestWithUser>();
  return (request.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || request.ip || '';
});
