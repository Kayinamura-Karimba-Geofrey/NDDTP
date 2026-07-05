import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
export declare class PlatformHealthController {
    private readonly health;
    private readonly db;
    constructor(health: HealthCheckService, db: TypeOrmHealthIndicator);
    live(): {
        status: string;
        timestamp: string;
    };
    ready(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
