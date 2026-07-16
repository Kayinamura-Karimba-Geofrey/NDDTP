import { Controller, Get, Patch, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SecurityEventService } from './security-event.service';
import { SearchSecurityEventsDto } from './dto/security-event.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Security Events')
@ApiBearerAuth('access-token')
@Controller('security-events')
export class SecurityEventController {
  constructor(private readonly service: SecurityEventService) {}

  @Get()
  @RequirePermissions('audit:read:security')
  @ApiOperation({ summary: 'Search security events' })
  search(@Query() query: SearchSecurityEventsDto) {
    const { page = 1, limit = 50, fromDate, toDate, ...filters } = query;
    return this.service.search({
      ...filters,
      fromDate: fromDate ? new Date(fromDate) : undefined,
      toDate: toDate ? new Date(toDate) : undefined,
    }, page, limit);
  }

  @Get(':id')
  @RequirePermissions('audit:read:security')
  @ApiOperation({ summary: 'Get security event by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Patch(':id/resolve')
  @RequirePermissions('audit:manage:security')
  @ApiOperation({ summary: 'Mark security event as resolved' })
  resolve(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.resolve(id, user.sub);
  }
}
