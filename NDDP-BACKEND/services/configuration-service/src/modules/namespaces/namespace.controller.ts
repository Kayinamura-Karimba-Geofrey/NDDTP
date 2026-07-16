import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NamespaceService } from './namespace.service';
import { CreateNamespaceDto } from './dto/namespace.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Namespaces')
@ApiBearerAuth('access-token')
@Controller('namespaces')
export class NamespaceController {
  constructor(private readonly service: NamespaceService) {}

  @Post()
  @RequirePermissions('configuration:manage:namespaces')
  @ApiOperation({ summary: 'Create configuration namespace' })
  create(@Body() dto: CreateNamespaceDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('configuration:read:namespaces')
  @ApiOperation({ summary: 'List active namespaces' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('configuration:read:namespaces')
  @ApiOperation({ summary: 'Get namespace by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
