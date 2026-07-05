import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WorkflowInstanceService } from './workflow-instance.service';
import { CreateInstanceDto, InstanceFilterDto } from './dto/workflow-instance.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Workflow Instances')
@ApiBearerAuth('access-token')
@Controller('instances')
export class WorkflowInstanceController {
  constructor(private readonly service: WorkflowInstanceService) {}

  @Post()
  @RequirePermissions('workflow:read:instances')
  @ApiOperation({ summary: 'Create workflow instance (draft)' })
  create(@Body() dto: CreateInstanceDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('workflow:read:instances')
  @ApiOperation({ summary: 'List my workflow instances' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get()
  @RequirePermissions('workflow:manage:instances')
  @ApiOperation({ summary: 'List workflow instances' })
  findAll(@Query() query: InstanceFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('workflow:read:instances')
  @ApiOperation({ summary: 'Get workflow instance by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Get(':id/logs')
  @RequirePermissions('workflow:read:instances')
  @ApiOperation({ summary: 'Get workflow activity logs' })
  findLogs(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findLogs(id);
  }

  @Post(':id/start')
  @RequirePermissions('workflow:read:instances')
  @ApiOperation({ summary: 'Start workflow instance' })
  start(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.start(id, user.sub);
  }

  @Post(':id/cancel')
  @RequirePermissions('workflow:read:instances')
  @ApiOperation({ summary: 'Cancel own workflow instance' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, false);
  }

  @Post(':id/cancel-staff')
  @RequirePermissions('workflow:manage:instances')
  @ApiOperation({ summary: 'Cancel workflow instance (staff)' })
  cancelStaff(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, true);
  }
}
