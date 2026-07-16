import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CalendarEventService } from './calendar-event.service';
import { CreateEventDto, EventFilterDto } from './dto/calendar-event.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Calendar Events')
@ApiBearerAuth('access-token')
@Controller('events')
export class CalendarEventController {
  constructor(private readonly service: CalendarEventService) {}

  @Post()
  @RequirePermissions('calendar:read:events')
  @ApiOperation({ summary: 'Create calendar event (draft)' })
  create(@Body() dto: CreateEventDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('calendar:read:events')
  @ApiOperation({ summary: 'List my events' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get()
  @RequirePermissions('calendar:read:events')
  @ApiOperation({ summary: 'List calendar events' })
  findAll(@Query() query: EventFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('calendar:read:events')
  @ApiOperation({ summary: 'Get event by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/schedule')
  @RequirePermissions('calendar:read:events')
  @ApiOperation({ summary: 'Schedule draft event' })
  schedule(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.schedule(id, user.sub);
  }

  @Post(':id/complete')
  @RequirePermissions('calendar:manage:events')
  @ApiOperation({ summary: 'Mark event as completed' })
  complete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.complete(id);
  }

  @Post(':id/cancel')
  @RequirePermissions('calendar:read:events')
  @ApiOperation({ summary: 'Cancel own event' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, false);
  }

  @Post(':id/cancel-staff')
  @RequirePermissions('calendar:manage:events')
  @ApiOperation({ summary: 'Cancel event (staff)' })
  cancelStaff(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, true);
  }
}
