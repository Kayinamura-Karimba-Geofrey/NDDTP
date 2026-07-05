import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ConnectorService } from './connector.service';
import { CreateConnectorDto } from './dto/connector.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Connectors')
@ApiBearerAuth('access-token')
@Controller('connectors')
export class ConnectorController {
  constructor(private readonly service: ConnectorService) {}

  @Post()
  @RequirePermissions('integration:manage:connectors')
  @ApiOperation({ summary: 'Create integration connector' })
  create(@Body() dto: CreateConnectorDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('integration:read:connectors')
  @ApiOperation({ summary: 'List active connectors' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('integration:read:connectors')
  @ApiOperation({ summary: 'Get connector by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
