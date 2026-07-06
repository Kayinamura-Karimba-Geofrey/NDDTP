import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import helmet from 'helmet';
import { createPlatformValidationPipe } from '@nddtp/platform-core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const cs = app.get(ConfigService);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const port = cs.get<number>('app.port') || 3006;
  const apiPrefix = cs.get<string>('app.apiPrefix') || 'api/v1';

  app.setGlobalPrefix(apiPrefix);
  app.use(helmet());
  app.enableCors({ origin: cs.get<string[]>('app.corsOrigins'), credentials: true });
  app.useGlobalPipes(createPlatformValidationPipe());

  const swagger = new DocumentBuilder()
    .setTitle('NDDTP Personnel Service')
    .setDescription('Military HR records, ranks, assignments, units, and qualifications')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .addTag('Personnel Records').addTag('Ranks').addTag('Units')
    .addTag('Assignments').addTag('Qualifications').addTag('Health')
    .build();

  SwaggerModule.setup(`${apiPrefix}/docs`, app, SwaggerModule.createDocument(app, swagger));
  await app.listen(port, cs.get<string>('app.host') || '0.0.0.0');
  Logger.log(`Personnel Service on port ${port}`, 'Bootstrap');
  Logger.log(`Swagger: http://localhost:${port}/${apiPrefix}/docs`, 'Bootstrap');
}

bootstrap();
