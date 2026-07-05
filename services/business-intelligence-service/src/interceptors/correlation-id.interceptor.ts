import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest();
    req.correlationId = req.headers['x-correlation-id'] || uuidv4();
    return next.handle().pipe(map((data) => ({
      success: true, data, timestamp: new Date().toISOString(), correlationId: req.correlationId,
    })));
  }
}
