import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WorkOrderService } from './work-order.service';
import { CreateWorkOrderDto, ScheduleWorkOrderDto, WorkOrderFilterDto } from './dto/work-order.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';

@ApiTags('Work Orders')
@ApiBearerAuth('access-token')
@Controller('work-orders')
export class WorkOrderController {
  constructor(private readonly service: WorkOrderService) {}

  @Post()
  @RequirePermissions('maintenance:manage:work-orders')
  @ApiOperation({ summary: 'Create work order with tasks' })
  create(@Body() dto: CreateWorkOrderDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get()
  @RequirePermissions('maintenance:read:work-orders')
  @ApiOperation({ summary: 'List work orders' })
  findAll(@Query() query: WorkOrderFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('maintenance:read:work-orders')
  @ApiOperation({ summary: 'Get work order by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Get(':id/logs')
  @RequirePermissions('maintenance:read:work-orders')
  @ApiOperation({ summary: 'Get work order activity log' })
  logs(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findLogs(id);
  }

  @Post(':id/schedule')
  @RequirePermissions('maintenance:manage:work-orders')
  @ApiOperation({ summary: 'Schedule work order' })
  schedule(@Param('id', ParseUUIDPipe) id: string, @Body() dto: ScheduleWorkOrderDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.schedule(id, user.sub, dto);
  }

  @Post(':id/start')
  @RequirePermissions('maintenance:manage:work-orders')
  @ApiOperation({ summary: 'Start work order' })
  start(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.start(id, user.sub);
  }

  @Post(':id/complete')
  @RequirePermissions('maintenance:manage:work-orders')
  @ApiOperation({ summary: 'Complete work order' })
  complete(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.complete(id, user.sub);
  }

  @Post(':id/cancel')
  @RequirePermissions('maintenance:manage:work-orders')
  @ApiOperation({ summary: 'Cancel work order' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub);
  }
}
