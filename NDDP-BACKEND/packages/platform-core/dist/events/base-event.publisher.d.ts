import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare abstract class BaseEventPublisher implements OnModuleInit, OnModuleDestroy {
    protected readonly configService: ConfigService;
    protected readonly logger: Logger;
    private connection;
    private channel;
    constructor(configService: ConfigService);
    protected abstract getSourceName(): string;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    protected publish(routingKey: string, data: Record<string, unknown>, correlationId?: string): Promise<void>;
}
