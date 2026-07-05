import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EndpointService } from './endpoint.service';
import { CreateEndpointDto } from './dto/endpoint.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Endpoints')
@ApiBearerAuth('access-token')
@Controller('endpoints')
export class EndpointController {
  constructor(private readonly service: EndpointService) {}

  @Post()
  @RequirePermissions('integration:manage:endpoints')
  @ApiOperation({ summary: 'Create integration endpoint' })
  create(@Body() dto: CreateEndpointDto) {
    return this.service.create(dto);
  }

  @Get('connector/:connectorId')
  @RequirePermissions('integration:read:endpoints')
  @ApiOperation({ summary: 'List endpoints for connector' })
  findByConnector(@Param('connectorId', ParseUUIDPipe) connectorId: string) {
    return this.service.findByConnector(connectorId);
  }

  @Get(':id')
  @RequirePermissions('integration:read:endpoints')
  @ApiOperation({ summary: 'Get endpoint by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
