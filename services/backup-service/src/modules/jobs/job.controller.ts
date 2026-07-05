import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JobService } from './job.service';
import { CreateJobDto, FailJobDto, CompleteJobDto, JobFilterDto } from './dto/job.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Backup Jobs')
@ApiBearerAuth('access-token')
@Controller('jobs')
export class JobController {
  constructor(private readonly service: JobService) {}

  @Post()
  @RequirePermissions('backup:read:jobs')
  @ApiOperation({ summary: 'Submit backup job' })
  submit(@Body() dto: CreateJobDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.submit(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('backup:read:jobs')
  @ApiOperation({ summary: 'List my backup jobs' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get()
  @RequirePermissions('backup:manage:jobs')
  @ApiOperation({ summary: 'List backup jobs' })
  findAll(@Query() query: JobFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('backup:read:jobs')
  @ApiOperation({ summary: 'Get backup job by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/start')
  @RequirePermissions('backup:manage:jobs')
  @ApiOperation({ summary: 'Start backup job execution' })
  start(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.start(id);
  }

  @Post(':id/complete')
  @RequirePermissions('backup:manage:jobs')
  @ApiOperation({ summary: 'Complete backup job' })
  complete(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CompleteJobDto) {
    return this.service.complete(id, dto);
  }

  @Post(':id/fail')
  @RequirePermissions('backup:manage:jobs')
  @ApiOperation({ summary: 'Mark backup job as failed' })
  fail(@Param('id', ParseUUIDPipe) id: string, @Body() dto: FailJobDto) {
    return this.service.fail(id, dto);
  }

  @Post(':id/cancel')
  @RequirePermissions('backup:read:jobs')
  @ApiOperation({ summary: 'Cancel own backup job' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, false);
  }

  @Post(':id/cancel-staff')
  @RequirePermissions('backup:manage:jobs')
  @ApiOperation({ summary: 'Cancel backup job (staff)' })
  cancelStaff(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, true);
  }
}
