import { Controller, Get, Post, Patch, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ConfigEntryService } from './config-entry.service';
import { CreateConfigEntryDto, UpdateConfigEntryDto } from './dto/config-entry.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Config Entries')
@ApiBearerAuth('access-token')
@Controller('entries')
export class ConfigEntryController {
  constructor(private readonly service: ConfigEntryService) {}

  @Post()
  @RequirePermissions('configuration:manage:entries')
  @ApiOperation({ summary: 'Create configuration entry' })
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateConfigEntryDto) {
    return this.service.create(user.sub, dto);
  }

  @Get('namespace/:namespaceId/active')
  @RequirePermissions('configuration:read:entries')
  @ApiOperation({ summary: 'List active entries in namespace' })
  findActive(@Param('namespaceId', ParseUUIDPipe) namespaceId: string) {
    return this.service.findActiveByNamespace(namespaceId);
  }

  @Get('namespace/:namespaceId')
  @RequirePermissions('configuration:manage:entries')
  @ApiOperation({ summary: 'List all entries in namespace' })
  findByNamespace(@Param('namespaceId', ParseUUIDPipe) namespaceId: string) {
    return this.service.findByNamespace(namespaceId);
  }

  @Get(':id')
  @RequirePermissions('configuration:read:entries')
  @ApiOperation({ summary: 'Get entry by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  @RequirePermissions('configuration:manage:entries')
  @ApiOperation({ summary: 'Update configuration entry value' })
  update(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser, @Body() dto: UpdateConfigEntryDto) {
    return this.service.update(id, user.sub, dto);
  }

  @Post(':id/activate')
  @RequirePermissions('configuration:manage:entries')
  @ApiOperation({ summary: 'Activate configuration entry' })
  activate(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.activate(id);
  }

  @Post(':id/deprecate')
  @RequirePermissions('configuration:manage:entries')
  @ApiOperation({ summary: 'Deprecate configuration entry' })
  deprecate(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.deprecate(id);
  }
}
