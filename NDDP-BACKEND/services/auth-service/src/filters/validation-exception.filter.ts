import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as Record<string, unknown>;

    const errors = this.formatValidationErrors(exceptionResponse.message);

    this.logger.warn(`Validation failed: ${JSON.stringify(errors)}`);

    response.status(status).json({
      statusCode: status,
      message: 'Validation failed',
      error: 'Bad Request',
      errors,
      timestamp: new Date().toISOString(),
    });
  }

  private formatValidationErrors(
    message: unknown,
  ): Array<{ field: string; constraints: string[] }> {
    if (!Array.isArray(message)) {
      return [{ field: 'unknown', constraints: [String(message)] }];
    }

    return message.map((msg: string) => {
      const parts = msg.split(' ');
      const field = parts[0] || 'unknown';
      return { field, constraints: [msg] };
    });
  }
}
