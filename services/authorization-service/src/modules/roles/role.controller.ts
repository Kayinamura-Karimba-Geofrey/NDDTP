import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto, RoleFilterDto, GrantPermissionsDto, RoleResponseDto } from './dto/role.dto';
import { JwtAuthGuard, PermissionsGuard } from '@nddtp/platform-core';
import { RequirePermissions, Public } from '@nddtp/platform-core';
import { CurrentUser, CorrelationId } from '../../decorators/current-user.decorator';

@ApiTags('Roles')
@Controller('roles')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @RequirePermissions('authorization:manage:roles')
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: 201, type: RoleResponseDto })
  create(@Body() dto: CreateRoleDto, @CurrentUser('sub') userId: string, @CorrelationId() cid: string) {
    return this.roleService.create(dto, userId, cid);
  }

  @Get()
  @RequirePermissions('authorization:manage:roles')
  @ApiOperation({ summary: 'List all roles' })
  findAll(@Query() filter: RoleFilterDto) {
    return this.roleService.findAll(filter);
  }

  @Get(':id')
  @RequirePermissions('authorization:manage:roles')
  @ApiOperation({ summary: 'Get role by ID with permissions' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.roleService.findById(id);
  }

  @Put(':id')
  @RequirePermissions('authorization:manage:roles')
  @ApiOperation({ summary: 'Update role' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRoleDto,
    @CorrelationId() cid: string,
  ) {
    return this.roleService.update(id, dto, cid);
  }

  @Delete(':id')
  @RequirePermissions('authorization:manage:roles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete role (soft delete)' })
  remove(@Param('id', ParseUUIDPipe) id: string, @CorrelationId() cid: string) {
    return this.roleService.delete(id, cid);
  }

  @Post(':id/permissions')
  @RequirePermissions('authorization:manage:roles')
  @ApiOperation({ summary: 'Grant permissions to role' })
  grantPermissions(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: GrantPermissionsDto,
    @CurrentUser('sub') userId: string,
    @CorrelationId() cid: string,
  ) {
    return this.roleService.grantPermissions(id, dto.permissionIds, userId, cid);
  }

  @Delete(':id/permissions')
  @RequirePermissions('authorization:manage:roles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revoke permissions from role' })
  revokePermissions(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: GrantPermissionsDto,
    @CorrelationId() cid: string,
  ) {
    return this.roleService.revokePermissions(id, dto.permissionIds, cid);
  }
}
