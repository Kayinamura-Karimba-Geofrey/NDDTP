import { Controller, Get, Post, Patch, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import { SubmitApplicationDto, UpdateApplicationStatusDto, ApplicationFilterDto } from './dto/application.dto';
import { RequirePermissions, Public, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationController {
  constructor(private readonly service: ApplicationService) {}

  @Public()
  @Post('job-postings/:postingId/apply')
  @ApiOperation({ summary: 'Submit application for a job posting (public)' })
  apply(@Param('postingId', ParseUUIDPipe) postingId: string, @Body() dto: SubmitApplicationDto) {
    return this.service.submit(postingId, dto);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @RequirePermissions('recruitment:read:applications')
  @ApiOperation({ summary: 'List applications' })
  findAll(@Query() query: ApplicationFilterDto) { return this.service.findAll(query); }

  @Get('pipeline/stats')
  @ApiBearerAuth('access-token')
  @RequirePermissions('recruitment:read:applications')
  @ApiOperation({ summary: 'Get recruitment pipeline statistics' })
  stats() { return this.service.getPipelineStats(); }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @RequirePermissions('recruitment:read:applications')
  @ApiOperation({ summary: 'Get application by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.service.findById(id); }

  @Patch(':id/status')
  @ApiBearerAuth('access-token')
  @RequirePermissions('recruitment:manage:applications')
  @ApiOperation({ summary: 'Update application status' })
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateApplicationStatusDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.updateStatus(id, dto, user.sub);
  }
}
