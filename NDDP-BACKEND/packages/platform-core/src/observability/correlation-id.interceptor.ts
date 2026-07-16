import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { RequestWithUser } from '../interfaces';

@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const incoming = request.headers['x-correlation-id'] as string | undefined;
    const correlationId = incoming || uuidv4();
    request.correlationId = correlationId;
    request.headers['x-correlation-id'] = correlationId;
    const response = context.switchToHttp().getResponse();
    response.setHeader('x-correlation-id', correlationId);
    return next.handle();
  }
}
