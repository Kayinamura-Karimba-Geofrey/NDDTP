import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WorkflowTaskService } from './workflow-task.service';
import { DecideTaskDto, TaskFilterDto } from './dto/workflow-task.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Workflow Tasks')
@ApiBearerAuth('access-token')
@Controller('tasks')
export class WorkflowTaskController {
  constructor(private readonly service: WorkflowTaskService) {}

  @Get('pending')
  @RequirePermissions('workflow:manage:tasks')
  @ApiOperation({ summary: 'List pending approval tasks' })
  pending(@Query() query: TaskFilterDto, @Query('approverRole') approverRole?: string) {
    return this.service.findPending(query.page, query.limit, approverRole);
  }

  @Get('me')
  @RequirePermissions('workflow:read:tasks')
  @ApiOperation({ summary: 'List my assigned pending tasks' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get('instance/:instanceId')
  @RequirePermissions('workflow:read:tasks')
  @ApiOperation({ summary: 'List tasks for a workflow instance' })
  findByInstance(@Param('instanceId', ParseUUIDPipe) instanceId: string) {
    return this.service.findByInstanceId(instanceId);
  }

  @Get(':id')
  @RequirePermissions('workflow:read:tasks')
  @ApiOperation({ summary: 'Get task by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/approve')
  @RequirePermissions('workflow:manage:tasks')
  @ApiOperation({ summary: 'Approve workflow task' })
  approve(@Param('id', ParseUUIDPipe) id: string, @Body() dto: DecideTaskDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.approve(id, user.sub, dto);
  }

  @Post(':id/reject')
  @RequirePermissions('workflow:manage:tasks')
  @ApiOperation({ summary: 'Reject workflow task' })
  reject(@Param('id', ParseUUIDPipe) id: string, @Body() dto: DecideTaskDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.reject(id, user.sub, dto);
  }

  @Post(':id/skip')
  @RequirePermissions('workflow:manage:tasks')
  @ApiOperation({ summary: 'Skip optional workflow task' })
  skip(@Param('id', ParseUUIDPipe) id: string, @Body() dto: DecideTaskDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.skip(id, user.sub, dto);
  }
}
