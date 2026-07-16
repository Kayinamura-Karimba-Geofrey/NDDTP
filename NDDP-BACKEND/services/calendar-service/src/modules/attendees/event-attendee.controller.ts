import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EventAttendeeService } from './event-attendee.service';
import { InviteAttendeeDto, RespondRsvpDto } from './dto/attendee.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { RsvpStatus } from '../../common/enums';

@ApiTags('Event Attendees')
@ApiBearerAuth('access-token')
@Controller('attendees')
export class EventAttendeeController {
  constructor(private readonly service: EventAttendeeService) {}

  @Post('event/:eventId')
  @RequirePermissions('calendar:manage:attendees')
  @ApiOperation({ summary: 'Invite attendee to event' })
  invite(
    @Param('eventId', ParseUUIDPipe) eventId: string,
    @Body() dto: InviteAttendeeDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.invite(eventId, user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('calendar:read:attendees')
  @ApiOperation({ summary: 'List my event invitations' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query('rsvpStatus') rsvpStatus?: RsvpStatus) {
    return this.service.findMine(user.sub, rsvpStatus);
  }

  @Get('event/:eventId')
  @RequirePermissions('calendar:read:attendees')
  @ApiOperation({ summary: 'List attendees for an event' })
  findByEvent(@Param('eventId', ParseUUIDPipe) eventId: string) {
    return this.service.findByEventId(eventId);
  }

  @Get(':id')
  @RequirePermissions('calendar:read:attendees')
  @ApiOperation({ summary: 'Get attendee by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/respond')
  @RequirePermissions('calendar:read:attendees')
  @ApiOperation({ summary: 'Respond to event invitation' })
  respond(@Param('id', ParseUUIDPipe) id: string, @Body() dto: RespondRsvpDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.respond(id, user.sub, dto);
  }
}
