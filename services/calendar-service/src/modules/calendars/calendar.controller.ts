import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/calendar.dto';
import { RequirePermissions } from '../../decorators/auth.decorators';

@ApiTags('Calendars')
@ApiBearerAuth('access-token')
@Controller('calendars')
export class CalendarController {
  constructor(private readonly service: CalendarService) {}

  @Post()
  @RequirePermissions('calendar:manage:calendars')
  @ApiOperation({ summary: 'Create calendar' })
  create(@Body() dto: CreateCalendarDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('calendar:read:calendars')
  @ApiOperation({ summary: 'List active calendars' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('calendar:read:calendars')
  @ApiOperation({ summary: 'Get calendar by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
