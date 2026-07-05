#!/usr/bin/env node
/**
 * Standardizes all NDDTP microservices to use @nddtp/platform-core
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SERVICES_DIR = path.join(ROOT, 'services');
const SKIP_SERVICES = new Set(['auth-service']); // auth has custom middleware/filters

const IMPORT_REPLACEMENTS = [
  [/from ['"](\.\.\/)+decorators\/auth\.decorators['"]/g, "from '@nddtp/platform-core'"],
  [/from ['"](\.\.\/)+common\/dto\/pagination\.dto['"]/g, "from '@nddtp/platform-core'"],
  [/from ['"](\.\.\/)+guards\/jwt-auth\.guard['"]/g, "from '@nddtp/platform-core'"],
  [/from ['"](\.\.\/)+guards\/permissions\.guard['"]/g, "from '@nddtp/platform-core'"],
];

const FILES_TO_DELETE = [
  'src/guards/jwt-auth.guard.ts',
  'src/guards/permissions.guard.ts',
  'src/strategies/jwt.strategy.ts',
  'src/filters/global-exception.filter.ts',
  'src/interceptors/correlation-id.interceptor.ts',
  'src/decorators/auth.decorators.ts',
  'src/common/interfaces/index.ts',
  'src/common/dto/pagination.dto.ts',
  'src/config/jwt.config.ts',
  'src/config/security.config.ts',
  'src/config/winston.config.ts',
  'src/config/database.config.ts',
  'src/config/redis.config.ts',
  'src/config/rabbitmq.config.ts',
  'src/modules/health/health.controller.ts',
  'src/modules/health/health.module.ts',
];

function parseEnvExample(serviceDir) {
  const envPath = path.join(serviceDir, '.env.example');
  const content = fs.readFileSync(envPath, 'utf8');
  const get = (key) => {
    const match = content.match(new RegExp(`^${key}=(.+)$`, 'm'));
    return match ? match[1].trim() : undefined;
  };
  return {
    appName: get('APP_NAME') || '',
    port: parseInt(get('APP_PORT') || '3000', 10),
    databaseName: get('DB_NAME') || '',
    redisDb: parseInt(get('REDIS_DB') || '0', 10),
    queuePrefix: get('RABBITMQ_QUEUE_PREFIX') || path.basename(serviceDir),
  };
}

function walkTsFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== 'dist') {
      walkTsFiles(full, files);
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      files.push(full);
    }
  }
  return files;
}

function rewriteConfigIndex(serviceDir, defaults) {
  const content = `import { createPlatformConfiguration } from '@nddtp/platform-core';

export const configuration = createPlatformConfiguration({
  appName: '${defaults.appName}',
  port: ${defaults.port},
  databaseName: '${defaults.databaseName}',
  redisDb: ${defaults.redisDb},
  queuePrefix: '${defaults.queuePrefix}',
});
`;
  fs.writeFileSync(path.join(serviceDir, 'src/config/index.ts'), content);
}

function rewriteHealthModule(serviceDir) {
  const content = `import { PlatformHealthModule } from '@nddtp/platform-core';

export { PlatformHealthModule as HealthModule };
`;
  fs.mkdirSync(path.join(serviceDir, 'src/modules/health'), { recursive: true });
  fs.writeFileSync(path.join(serviceDir, 'src/modules/health/health.module.ts'), content);
}

function rewriteExceptions(serviceDir) {
  const exceptionsDir = path.join(serviceDir, 'src/common/exceptions');
  if (!fs.existsSync(exceptionsDir)) return;

  const PLATFORM_EXCEPTIONS = new Set([
    'ResourceNotFoundException',
    'DuplicateResourceException',
    'InvalidStatusTransitionException',
    'BusinessRuleViolationException',
    'ForbiddenAccessException',
  ]);

  for (const file of fs.readdirSync(exceptionsDir)) {
    if (!file.endsWith('.ts')) continue;
    const filePath = path.join(exceptionsDir, file);
    const original = fs.readFileSync(filePath, 'utf8');

    if (original.includes('NestNest') || original.includes('NestHttpException')) {
      continue;
    }

    const customClasses = [...original.matchAll(/export class (\w+Exception)([\s\S]*?\n\})/g)]
      .filter(([block, className]) => !PLATFORM_EXCEPTIONS.has(className) && !block.includes("from '@nddtp/platform-core'"));

    let content = `export {
  ResourceNotFoundException,
  DuplicateResourceException,
  InvalidStatusTransitionException,
  BusinessRuleViolationException,
  ForbiddenAccessException,
} from '@nddtp/platform-core';
`;

    if (!customClasses.length) {
      fs.writeFileSync(filePath, content);
      continue;
    }

    const needsHttp = customClasses.some(([, className, body]) =>
      !className.includes('Forbidden') && !className.includes('Access') && !body.includes('ForbiddenAccessException'),
    );
    const needsForbidden = customClasses.some(([, className, body]) =>
      className.includes('Forbidden') || className.includes('Access') || body.includes('ForbiddenAccessException'),
    );

    if (needsForbidden) {
      content += `\nimport { ForbiddenAccessException } from '@nddtp/platform-core';\n`;
    }
    if (needsHttp) {
      content += `import { HttpException, HttpStatus } from '@nestjs/common';\n`;
    }

    for (const [, className, body] of customClasses) {
      if (className.includes('Forbidden') || className.includes('Access')) {
        content += `\nexport class ${className} extends ForbiddenAccessException {
  constructor(message?: string) {
    super(message || 'Access denied');
  }
}\n`;
        continue;
      }

      const cleanedBody = body
        .replace(/extends Nest(?:Nest)?(?:Nest)?HttpException/g, 'extends HttpException')
        .replace(/Nest(?:Nest)?(?:Nest)?HttpStatus/g, 'HttpStatus');
      content += `\nexport class ${className}${cleanedBody}\n`;
    }

    fs.writeFileSync(filePath, content);
  }
}

function cleanupEventPublisher(serviceDir) {
  const publisherPath = path.join(serviceDir, 'src/events/event-publisher.service.ts');
  if (!fs.existsSync(publisherPath)) return;

  let content = fs.readFileSync(publisherPath, 'utf8');
  if (!content.includes('extends BaseEventPublisher')) return;

  content = content
    .replace(/import \* as amqp from 'amqplib';\r?\n/g, '')
    .replace(/import \{ v4 as uuidv4 \} from 'uuid';\r?\n/g, '')
    .replace(/\r?\n  async onModuleInit\(\)[\s\S]*?(?=\r?\n  publish)/, '');

  fs.writeFileSync(publisherPath, content);
}

function rewriteEventPublisher(serviceDir, defaults) {
  const publisherPath = path.join(serviceDir, 'src/events/event-publisher.service.ts');
  if (!fs.existsSync(publisherPath)) return;

  let content = fs.readFileSync(publisherPath, 'utf8');
  if (content.includes('extends BaseEventPublisher')) {
    cleanupEventPublisher(serviceDir);
    return;
  }

  content = content
    .replace(
      /import \{ Injectable, Logger, OnModuleInit, OnModuleDestroy \} from '@nestjs\/common';/,
      "import { Injectable } from '@nestjs/common';",
    )
    .replace(/import \* as amqp from 'amqplib';\n/g, '')
    .replace(/import \{ v4 as uuidv4 \} from 'uuid';\n/g, '')
    .replace(
      /import \{ RABBITMQ_ROUTING_KEYS \} from '\.\.\/common\/constants';/,
      "import { BaseEventPublisher } from '@nddtp/platform-core';\nimport { RABBITMQ_ROUTING_KEYS } from '../common/constants';",
    )
    .replace(
      /export class EventPublisherService implements OnModuleInit, OnModuleDestroy \{[\s\S]*?constructor\([^)]*\) \{\}/,
      `export class EventPublisherService extends BaseEventPublisher {
  constructor(configService: ConfigService) {
    super(configService);
  }

  protected getSourceName(): string {
    return '${defaults.appName}';
  }`,
    )
    .replace(/private readonly logger = new Logger\(EventPublisherService\.name\);[\s\S]*?private async publish\([\s\S]*?\}\n\n/, '');

  fs.writeFileSync(publisherPath, content);
  cleanupEventPublisher(serviceDir);
}

const EXCLUDED_APP_MODULES = new Set([
  'DatabaseModule',
  'RedisModule',
  'EventsModule',
  'HealthModule',
  'PlatformModule',
  'PlatformHealthModule',
  'ConfigModule',
  'WinstonModule',
  'PassportModule',
  'JwtModule',
  'ThrottlerModule',
]);

function rewriteAppModule(serviceDir, defaults) {
  const appPath = path.join(serviceDir, 'src/app.module.ts');
  const content = fs.readFileSync(appPath, 'utf8');

  const INFRA_MODULES = new Set(['DatabaseModule', 'RedisModule', 'EventsModule']);
  const allModuleImports = [...content.matchAll(/import \{ (\w+Module) \} from '([^']+)';/g)];

  const infraLines = [];
  const domainLines = [];
  for (const [, mod, from] of allModuleImports) {
    if (EXCLUDED_APP_MODULES.has(mod)) {
      if (INFRA_MODULES.has(mod)) infraLines.push(`import { ${mod} } from '${from}';`);
      continue;
    }
    domainLines.push(`import { ${mod} } from '${from}';`);
  }

  const importsArray = [
    "    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),",
    `    PlatformModule.forRoot({ serviceName: '${defaults.appName}' }),`,
    ...[...new Set(infraLines.map((l) => l.match(/\{ (\w+)/)?.[1]))].map((mod) => `    ${mod},`),
    ...[...new Set(domainLines.map((l) => l.match(/\{ (\w+)/)?.[1]))].map((mod) => `    ${mod},`),
    '    PlatformHealthModule,',
  ].join('\n');

  const newContent = `import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule, PlatformHealthModule } from '@nddtp/platform-core';
import { configuration } from './config';
${[...new Set([...infraLines, ...domainLines])].join('\n')}

@Module({
  imports: [
${importsArray}
  ],
})
export class AppModule {}
`;

  fs.writeFileSync(appPath, newContent);
}

function updatePackageJson(serviceDir) {
  const pkgPath = path.join(serviceDir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.dependencies = pkg.dependencies || {};
  pkg.dependencies['@nddtp/platform-core'] = 'file:../../packages/platform-core';
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}

function applyImportReplacements(serviceDir) {
  const srcDir = path.join(serviceDir, 'src');
  if (!fs.existsSync(srcDir)) return;

  for (const file of walkTsFiles(srcDir)) {
    if (file.includes('app.module.ts') || file.includes('config/index.ts')) continue;
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    for (const [pattern, replacement] of IMPORT_REPLACEMENTS) {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        changed = true;
      }
    }
    if (changed) fs.writeFileSync(file, content);
  }
}

function standardizeService(serviceName) {
  const serviceDir = path.join(SERVICES_DIR, serviceName);
  if (!fs.existsSync(path.join(serviceDir, 'src/app.module.ts'))) {
    console.log(`  skip ${serviceName} (no app.module.ts)`);
    return;
  }

  console.log(`  standardizing ${serviceName}...`);
  const defaults = parseEnvExample(serviceDir);

  updatePackageJson(serviceDir);
  rewriteConfigIndex(serviceDir, defaults);
  rewriteHealthModule(serviceDir);
  rewriteExceptions(serviceDir);
  rewriteEventPublisher(serviceDir, defaults);
  rewriteAppModule(serviceDir, defaults);
  applyImportReplacements(serviceDir);

  for (const rel of FILES_TO_DELETE) {
    const filePath = path.join(serviceDir, rel);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
}

function main() {
  const services = fs.readdirSync(SERVICES_DIR).filter((name) => {
    const full = path.join(SERVICES_DIR, name);
    return fs.statSync(full).isDirectory() && !SKIP_SERVICES.has(name);
  });

  console.log(`Standardizing ${services.length} services (skipping: ${[...SKIP_SERVICES].join(', ')})`);
  for (const service of services.sort()) {
    standardizeService(service);
  }
  console.log('Done.');
}

main();
