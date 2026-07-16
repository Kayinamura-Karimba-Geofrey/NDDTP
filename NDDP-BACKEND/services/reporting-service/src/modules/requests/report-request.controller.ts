import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReportRequestService } from './report-request.service';
import { CreateReportRequestDto, FailReportRequestDto, CompleteReportRequestDto, RequestFilterDto } from './dto/report-request.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Report Requests')
@ApiBearerAuth('access-token')
@Controller('requests')
export class ReportRequestController {
  constructor(private readonly service: ReportRequestService) {}

  @Post()
  @RequirePermissions('reporting:read:requests')
  @ApiOperation({ summary: 'Submit report generation request' })
  submit(@Body() dto: CreateReportRequestDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.submit(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('reporting:read:requests')
  @ApiOperation({ summary: 'List my report requests' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get()
  @RequirePermissions('reporting:manage:requests')
  @ApiOperation({ summary: 'List report requests' })
  findAll(@Query() query: RequestFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('reporting:read:requests')
  @ApiOperation({ summary: 'Get report request by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Get(':id/outputs')
  @RequirePermissions('reporting:read:reports')
  @ApiOperation({ summary: 'Get generated outputs for request' })
  findOutputs(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOutputs(id);
  }

  @Post(':id/process')
  @RequirePermissions('reporting:manage:requests')
  @ApiOperation({ summary: 'Mark request as processing' })
  process(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.process(id);
  }

  @Post(':id/complete')
  @RequirePermissions('reporting:manage:requests')
  @ApiOperation({ summary: 'Complete report generation' })
  complete(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CompleteReportRequestDto) {
    return this.service.complete(id, dto);
  }

  @Post(':id/fail')
  @RequirePermissions('reporting:manage:requests')
  @ApiOperation({ summary: 'Mark report generation as failed' })
  fail(@Param('id', ParseUUIDPipe) id: string, @Body() dto: FailReportRequestDto) {
    return this.service.fail(id, dto);
  }

  @Post(':id/cancel')
  @RequirePermissions('reporting:read:requests')
  @ApiOperation({ summary: 'Cancel own report request' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, false);
  }

  @Post(':id/cancel-staff')
  @RequirePermissions('reporting:manage:requests')
  @ApiOperation({ summary: 'Cancel report request (staff)' })
  cancelStaff(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, true);
  }
}
