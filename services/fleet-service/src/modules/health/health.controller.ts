import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Public } from '../../decorators/auth.decorators';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService, private db: TypeOrmHealthIndicator) {}

  @Public()
  @Get('live')
  live() { return { status: 'ok', timestamp: new Date().toISOString() }; }

  @Public()
  @Get('ready')
  @HealthCheck()
  ready() { return this.health.check([() => this.db.pingCheck('database')]); }
}
