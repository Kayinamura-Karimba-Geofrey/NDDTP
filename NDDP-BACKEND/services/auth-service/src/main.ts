import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  const port = configService.get<number>('app.port') || 3001;
  const apiPrefix = configService.get<string>('app.apiPrefix') || 'api/v1';
  const corsOrigins = configService.get<string[]>('app.corsOrigins') || [];

  app.setGlobalPrefix(apiPrefix);

  app.use(helmet());

  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Correlation-Id',
      'X-Request-Id',
    ],
    exposedHeaders: ['X-Correlation-Id'],
    credentials: true,
    maxAge: 3600,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NDDTP Authentication Service')
    .setDescription(
      'Enterprise authentication microservice for the National Defence Digital Transformation Platform. ' +
        'Provides JWT authentication, refresh tokens, MFA, session management, and password reset.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT access token',
      },
      'access-token',
    )
    .addTag('Authentication', 'User authentication endpoints')
    .addTag('MFA', 'Multi-factor authentication')
    .addTag('Sessions', 'Session management')
    .addTag('Health', 'Health check endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(port, configService.get<string>('app.host') || '0.0.0.0');

  Logger.log(
    `NDDTP Auth Service running on port ${port}`,
    'Bootstrap',
  );
  Logger.log(
    `Swagger docs: http://localhost:${port}/${apiPrefix}/docs`,
    'Bootstrap',
  );
}

bootstrap();
