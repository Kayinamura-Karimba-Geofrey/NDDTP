import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuditLogService } from './audit-log.service';
import { SearchAuditLogsDto, CreateAuditLogDto } from './dto/audit.dto';
import { RequirePermissions } from '@nddtp/platform-core';
import { AuditOutcome, AuditSeverity } from '../../common/enums';

@ApiTags('Audit Logs')
@ApiBearerAuth('access-token')
@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly service: AuditLogService) {}

  @Get()
  @RequirePermissions('audit:read:logs')
  @ApiOperation({ summary: 'Search audit logs with filters' })
  search(@Query() query: SearchAuditLogsDto) {
    const { page = 1, limit = 50, fromDate, toDate, ...filters } = query;
    return this.service.search({
      ...filters,
      fromDate: fromDate ? new Date(fromDate) : undefined,
      toDate: toDate ? new Date(toDate) : undefined,
    }, page, limit);
  }

  @Get('users/:userId')
  @RequirePermissions('audit:read:logs')
  @ApiOperation({ summary: 'Get user activity audit trail' })
  userActivity(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query() query: SearchAuditLogsDto,
  ) {
    return this.service.getUserActivity(userId, query.page, query.limit);
  }

  @Get('resources/:resourceType/:resourceId')
  @RequirePermissions('audit:read:logs')
  @ApiOperation({ summary: 'Get resource change history' })
  resourceHistory(
    @Param('resourceType') resourceType: string,
    @Param('resourceId') resourceId: string,
    @Query() query: SearchAuditLogsDto,
  ) {
    return this.service.getResourceHistory(resourceType, resourceId, query.page, query.limit);
  }

  @Get(':id')
  @RequirePermissions('audit:read:logs')
  @ApiOperation({ summary: 'Get audit log by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Get(':id/verify')
  @RequirePermissions('audit:read:logs')
  @ApiOperation({ summary: 'Verify audit log integrity hash' })
  verify(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.verifyIntegrity(id);
  }

  @Post()
  @RequirePermissions('audit:create:logs')
  @ApiOperation({ summary: 'Manually record an audit log entry' })
  create(@Body() dto: CreateAuditLogDto) {
    return this.service.create({
      eventType: dto.eventType,
      source: dto.source || 'manual',
      category: dto.category,
      action: dto.action,
      outcome: dto.outcome || AuditOutcome.SUCCESS,
      severity: AuditSeverity.INFO,
      userId: dto.userId,
      description: dto.description,
    });
  }
}
