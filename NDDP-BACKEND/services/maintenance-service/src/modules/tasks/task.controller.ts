import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CompleteTaskDto } from './dto/task.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Work Order Tasks')
@ApiBearerAuth('access-token')
@Controller('tasks')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get('work-order/:workOrderId')
  @RequirePermissions('maintenance:read:tasks')
  @ApiOperation({ summary: 'List tasks for work order' })
  byWorkOrder(@Param('workOrderId', ParseUUIDPipe) workOrderId: string) {
    return this.service.findByWorkOrder(workOrderId);
  }

  @Post(':id/start')
  @RequirePermissions('maintenance:manage:tasks')
  @ApiOperation({ summary: 'Start task' })
  start(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.start(id, user.sub);
  }

  @Post(':id/complete')
  @RequirePermissions('maintenance:manage:tasks')
  @ApiOperation({ summary: 'Complete task' })
  complete(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CompleteTaskDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.complete(id, user.sub, dto);
  }

  @Post(':id/skip')
  @RequirePermissions('maintenance:manage:tasks')
  @ApiOperation({ summary: 'Skip task' })
  skip(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.skip(id, user.sub);
  }
}
