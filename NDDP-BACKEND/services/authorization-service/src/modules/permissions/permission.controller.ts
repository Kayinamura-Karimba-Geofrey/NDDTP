import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { CreatePermissionDto, UpdatePermissionDto, PermissionFilterDto } from './dto/permission.dto';
import { JwtAuthGuard, PermissionsGuard } from '@nddtp/platform-core';
import { RequirePermissions } from '@nddtp/platform-core';
import { CorrelationId } from '../../decorators/current-user.decorator';

@ApiTags('Permissions')
@Controller('permissions')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiBearerAuth()
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @RequirePermissions('authorization:manage:permissions')
  @ApiOperation({ summary: 'Create permission' })
  create(@Body() dto: CreatePermissionDto, @CorrelationId() cid: string) {
    return this.permissionService.create(dto, cid);
  }

  @Get()
  @RequirePermissions('authorization:manage:permissions')
  @ApiOperation({ summary: 'List permissions' })
  findAll(@Query() filter: PermissionFilterDto) {
    return this.permissionService.findAll(filter);
  }

  @Get(':id')
  @RequirePermissions('authorization:manage:permissions')
  @ApiOperation({ summary: 'Get permission by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.permissionService.findById(id);
  }

  @Put(':id')
  @RequirePermissions('authorization:manage:permissions')
  @ApiOperation({ summary: 'Update permission' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePermissionDto, @CorrelationId() cid: string) {
    return this.permissionService.update(id, dto, cid);
  }

  @Delete(':id')
  @RequirePermissions('authorization:manage:permissions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete permission' })
  remove(@Param('id', ParseUUIDPipe) id: string, @CorrelationId() cid: string) {
    return this.permissionService.delete(id, cid);
  }
}
