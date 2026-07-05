import { PlatformServiceDefaults } from '../interfaces';
export declare const createAppConfig: (defaults: PlatformServiceDefaults) => (() => {
    name: string;
    port: number;
    host: string;
    apiPrefix: string;
    corsOrigins: string[];
    nodeEnv: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    name: string;
    port: number;
    host: string;
    apiPrefix: string;
    corsOrigins: string[];
    nodeEnv: string;
}>;
export declare const databaseConfig: (() => {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
    ssl: boolean;
    logging: boolean;
    poolSize: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
    ssl: boolean;
    logging: boolean;
    poolSize: number;
}>;
export declare const createRedisConfig: (defaultDb: number) => (() => {
    host: string;
    port: number;
    db: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    host: string;
    port: number;
    db: number;
}>;
export declare const createRabbitmqConfig: (queuePrefix: string) => (() => {
    url: string;
    exchange: string;
    dlxExchange: string;
    queuePrefix: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    url: string;
    exchange: string;
    dlxExchange: string;
    queuePrefix: string;
}>;
export declare const jwtConfig: (() => {
    accessSecret: string;
    issuer: string;
    audience: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    accessSecret: string;
    issuer: string;
    audience: string;
}>;
export declare const securityConfig: (() => {
    rateLimitTtl: number;
    rateLimitLimit: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    rateLimitTtl: number;
    rateLimitLimit: number;
}>;
export declare const createPlatformConfiguration: (defaults: PlatformServiceDefaults) => (((() => {
    accessSecret: string;
    issuer: string;
    audience: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    accessSecret: string;
    issuer: string;
    audience: string;
}>) | ((() => {
    rateLimitTtl: number;
    rateLimitLimit: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    rateLimitTtl: number;
    rateLimitLimit: number;
}>) | ((() => {
    name: string;
    port: number;
    host: string;
    apiPrefix: string;
    corsOrigins: string[];
    nodeEnv: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    name: string;
    port: number;
    host: string;
    apiPrefix: string;
    corsOrigins: string[];
    nodeEnv: string;
}>) | ((() => {
    host: string;
    port: number;
    db: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    host: string;
    port: number;
    db: number;
}>) | ((() => {
    url: string;
    exchange: string;
    dlxExchange: string;
    queuePrefix: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    url: string;
    exchange: string;
    dlxExchange: string;
    queuePrefix: string;
}>) | ((() => {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
    ssl: boolean;
    logging: boolean;
    poolSize: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
    ssl: boolean;
    logging: boolean;
    poolSize: number;
}>))[];
