import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JobService } from './job.service';
import { CreateJobDto, FailJobDto, CompleteJobDto, AppendJobLogDto, JobFilterDto } from './dto/job.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Integration Jobs')
@ApiBearerAuth('access-token')
@Controller('jobs')
export class JobController {
  constructor(private readonly service: JobService) {}

  @Post()
  @RequirePermissions('integration:read:jobs')
  @ApiOperation({ summary: 'Submit integration job' })
  submit(@Body() dto: CreateJobDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.submit(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('integration:read:jobs')
  @ApiOperation({ summary: 'List my integration jobs' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get()
  @RequirePermissions('integration:manage:jobs')
  @ApiOperation({ summary: 'List integration jobs' })
  findAll(@Query() query: JobFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('integration:read:jobs')
  @ApiOperation({ summary: 'Get integration job by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Get(':id/logs')
  @RequirePermissions('integration:read:jobs')
  @ApiOperation({ summary: 'Get job execution logs' })
  findLogs(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findLogs(id);
  }

  @Post(':id/start')
  @RequirePermissions('integration:manage:jobs')
  @ApiOperation({ summary: 'Start integration job execution' })
  start(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.start(id);
  }

  @Post(':id/complete')
  @RequirePermissions('integration:manage:jobs')
  @ApiOperation({ summary: 'Complete integration job' })
  complete(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CompleteJobDto) {
    return this.service.complete(id, dto);
  }

  @Post(':id/fail')
  @RequirePermissions('integration:manage:jobs')
  @ApiOperation({ summary: 'Mark integration job as failed' })
  fail(@Param('id', ParseUUIDPipe) id: string, @Body() dto: FailJobDto) {
    return this.service.fail(id, dto);
  }

  @Post(':id/cancel')
  @RequirePermissions('integration:read:jobs')
  @ApiOperation({ summary: 'Cancel own integration job' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, false);
  }

  @Post(':id/cancel-staff')
  @RequirePermissions('integration:manage:jobs')
  @ApiOperation({ summary: 'Cancel integration job (staff)' })
  cancelStaff(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, true);
  }

  @Post(':id/logs')
  @RequirePermissions('integration:manage:jobs')
  @ApiOperation({ summary: 'Append log entry to job' })
  appendLog(@Param('id', ParseUUIDPipe) id: string, @Body() dto: AppendJobLogDto) {
    return this.service.appendLog(id, dto);
  }
}
