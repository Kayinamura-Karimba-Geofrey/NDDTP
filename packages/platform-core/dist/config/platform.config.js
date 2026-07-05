"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlatformConfiguration = exports.securityConfig = exports.jwtConfig = exports.createRabbitmqConfig = exports.createRedisConfig = exports.databaseConfig = exports.createAppConfig = void 0;
const config_1 = require("@nestjs/config");
const createAppConfig = (defaults) => (0, config_1.registerAs)('app', () => ({
    name: process.env.APP_NAME || defaults.appName,
    port: parseInt(process.env.APP_PORT || String(defaults.port), 10),
    host: process.env.APP_HOST || '0.0.0.0',
    apiPrefix: process.env.API_PREFIX || 'api/v1',
    corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:3000').split(','),
    nodeEnv: process.env.NODE_ENV || 'development',
}));
exports.createAppConfig = createAppConfig;
exports.databaseConfig = (0, config_1.registerAs)('database', () => ({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || '',
    ssl: process.env.DB_SSL === 'true',
    logging: process.env.DB_LOGGING === 'true',
    poolSize: parseInt(process.env.DB_POOL_SIZE || '10', 10),
}));
const createRedisConfig = (defaultDb) => (0, config_1.registerAs)('redis', () => ({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    db: parseInt(process.env.REDIS_DB || String(defaultDb), 10),
}));
exports.createRedisConfig = createRedisConfig;
const createRabbitmqConfig = (queuePrefix) => (0, config_1.registerAs)('rabbitmq', () => ({
    url: process.env.RABBITMQ_URL || 'amqp://nddtp:change_me@localhost:5672',
    exchange: process.env.RABBITMQ_EXCHANGE || 'nddtp.events',
    dlxExchange: process.env.RABBITMQ_DLX_EXCHANGE || 'nddtp.events.dlx',
    queuePrefix: process.env.RABBITMQ_QUEUE_PREFIX || queuePrefix,
}));
exports.createRabbitmqConfig = createRabbitmqConfig;
exports.jwtConfig = (0, config_1.registerAs)('jwt', () => ({
    accessSecret: process.env.JWT_ACCESS_SECRET || 'change_me_access_secret_min_32_chars_long',
    issuer: process.env.JWT_ISSUER || 'nddtp-auth-service',
    audience: process.env.JWT_AUDIENCE || 'nddtp-platform',
}));
exports.securityConfig = (0, config_1.registerAs)('security', () => ({
    rateLimitTtl: parseInt(process.env.RATE_LIMIT_TTL || '60', 10),
    rateLimitLimit: parseInt(process.env.RATE_LIMIT_LIMIT || '200', 10),
}));
const createPlatformConfiguration = (defaults) => [
    (0, exports.createAppConfig)(defaults),
    (0, config_1.registerAs)('database', () => ({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USERNAME || defaults.databaseName,
        password: process.env.DB_PASSWORD || '',
        name: process.env.DB_NAME || defaults.databaseName,
        ssl: process.env.DB_SSL === 'true',
        logging: process.env.DB_LOGGING === 'true',
        poolSize: parseInt(process.env.DB_POOL_SIZE || '10', 10),
    })),
    (0, exports.createRedisConfig)(defaults.redisDb),
    (0, exports.createRabbitmqConfig)(defaults.queuePrefix),
    exports.jwtConfig,
    exports.securityConfig,
];
exports.createPlatformConfiguration = createPlatformConfiguration;
//# sourceMappingURL=platform.config.js.map