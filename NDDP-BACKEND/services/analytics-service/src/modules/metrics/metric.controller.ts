import { Controller, Get, Post, Param, Body, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MetricService } from './metric.service';
import { CreateMetricDefinitionDto, RecordMetricSnapshotDto, SnapshotFilterDto } from './dto/metric.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Metrics')
@ApiBearerAuth('access-token')
@Controller('metrics')
export class MetricController {
  constructor(private readonly service: MetricService) {}

  @Post()
  @RequirePermissions('analytics:manage:metrics')
  @ApiOperation({ summary: 'Create metric definition' })
  createDefinition(@Body() dto: CreateMetricDefinitionDto) {
    return this.service.createDefinition(dto);
  }

  @Get()
  @RequirePermissions('analytics:read:metrics')
  @ApiOperation({ summary: 'List active metric definitions' })
  findActive() {
    return this.service.findActiveDefinitions();
  }

  @Get(':id')
  @RequirePermissions('analytics:read:metrics')
  @ApiOperation({ summary: 'Get metric definition by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findDefinitionById(id);
  }

  @Post(':id/snapshots')
  @RequirePermissions('analytics:manage:metrics')
  @ApiOperation({ summary: 'Record metric snapshot' })
  recordSnapshot(@Param('id', ParseUUIDPipe) id: string, @Body() dto: RecordMetricSnapshotDto) {
    return this.service.recordSnapshot(id, dto);
  }

  @Get(':id/snapshots')
  @RequirePermissions('analytics:read:snapshots')
  @ApiOperation({ summary: 'List metric snapshots' })
  findSnapshots(@Param('id', ParseUUIDPipe) id: string, @Query() filter: SnapshotFilterDto) {
    return this.service.findSnapshots(id, filter.from, filter.to);
  }
}
