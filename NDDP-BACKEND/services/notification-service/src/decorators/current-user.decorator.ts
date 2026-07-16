import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '@nddtp/platform-core';

export const CurrentUser = createParamDecorator(
  (data: keyof RequestWithUser['user'] | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<RequestWithUser>();
    return data ? req.user?.[data] : req.user;
  },
);

export const CorrelationId = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<RequestWithUser>();
  return req.correlationId || (req.headers['x-correlation-id'] as string) || '';
});
