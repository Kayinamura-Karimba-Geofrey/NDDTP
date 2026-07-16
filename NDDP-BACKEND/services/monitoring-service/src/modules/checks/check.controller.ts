import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CheckService } from './check.service';
import { CreateCheckDto, FailCheckDto, PassCheckDto, CheckFilterDto } from './dto/check.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Health Checks')
@ApiBearerAuth('access-token')
@Controller('checks')
export class CheckController {
  constructor(private readonly service: CheckService) {}

  @Post()
  @RequirePermissions('monitoring:read:checks')
  @ApiOperation({ summary: 'Submit health check' })
  submit(@Body() dto: CreateCheckDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.submit(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('monitoring:read:checks')
  @ApiOperation({ summary: 'List my health checks' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get()
  @RequirePermissions('monitoring:manage:checks')
  @ApiOperation({ summary: 'List health checks' })
  findAll(@Query() query: CheckFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('monitoring:read:checks')
  @ApiOperation({ summary: 'Get health check by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/start')
  @RequirePermissions('monitoring:manage:checks')
  @ApiOperation({ summary: 'Start health check execution' })
  start(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.start(id);
  }

  @Post(':id/pass')
  @RequirePermissions('monitoring:manage:checks')
  @ApiOperation({ summary: 'Mark health check as passed' })
  pass(@Param('id', ParseUUIDPipe) id: string, @Body() dto: PassCheckDto) {
    return this.service.pass(id, dto);
  }

  @Post(':id/fail')
  @RequirePermissions('monitoring:manage:checks')
  @ApiOperation({ summary: 'Mark health check as failed' })
  fail(@Param('id', ParseUUIDPipe) id: string, @Body() dto: FailCheckDto) {
    return this.service.fail(id, dto);
  }

  @Post(':id/cancel')
  @RequirePermissions('monitoring:read:checks')
  @ApiOperation({ summary: 'Cancel own health check' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, false);
  }

  @Post(':id/cancel-staff')
  @RequirePermissions('monitoring:manage:checks')
  @ApiOperation({ summary: 'Cancel health check (staff)' })
  cancelStaff(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, true);
  }
}
