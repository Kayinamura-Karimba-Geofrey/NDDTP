import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const { statusCode } = res;
      const logLevel = statusCode >= 400 ? 'warn' : 'log';

      this.logger[logLevel](
        `${method} ${originalUrl} ${statusCode} ${duration}ms - ${ip} "${userAgent}"`,
      );
    });

    next();
  }
}
