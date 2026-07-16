import { ValidationPipe } from '@nestjs/common';

/**
 * Shared ValidationPipe for NDDTP services.
 * Note: forbidNonWhitelisted is disabled because filter DTOs extend PaginationDto
 * from this package and class-validator does not inherit whitelist metadata across
 * package boundaries (query params like page/limit would otherwise fail).
 */
export const createPlatformValidationPipe = () =>
  new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  });
